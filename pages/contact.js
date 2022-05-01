import { useState } from "react";
import Head from "next/head";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import Layout from "../components/Layout";

import street from "../public/assets/images/street.jpg";

import styles from "../styles/contact.module.scss";

import schema from "../utils/yupSchema";

const contact = () => {
  const [messageSent, setMessageStatus] = useState(false);
  const darkGrayBorder = "#232323";
  const redBorder = "#df080f";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data, e) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}contact`,
        data
      );

      if (res.data === "Success") {
        setMessageStatus(!messageSent);
        e.target.reset();
      }

      console.log(res);
    } catch (err) {
      console.log("error");
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>

      <Layout showSocial mainClassName={styles.main}>
        <div className={styles.row}>
          <div className={styles.image_wrapper}>
            <img src={street} alt="street" />
          </div>
          <div className={styles.contact_wrapper}>
            <div className={styles.contact_info_wrapper}>
              <div className={styles.info}>
                <span>
                  <strong>Email</strong>
                </span>{" "}
                <span className={styles.info_value}>...</span>
              </div>
              <div className={styles.info}>
                <span>
                  <strong>Website</strong>
                </span>{" "}
                <span className={styles.info_value}>thecodingjohn.com</span>
              </div>
              <div className={styles.info}>
                <span>
                  <strong>Address</strong>
                </span>{" "}
                <span className={styles.info_value}>Philippines</span>
              </div>
            </div>

            <div className={styles.contact_form_wrapper}>
              <h2>Send message</h2>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.contact_form}
              >
                <input
                  className={styles.input_field}
                  type="text"
                  placeholder="Your name"
                  name="name"
                  {...register("name")}
                  style={{
                    border: `1px solid ${
                      errors.name ? redBorder : darkGrayBorder
                    }`,
                  }}
                />
                <input
                  className={styles.input_field}
                  type="email"
                  placeholder="Your email"
                  name="email"
                  {...register("email")}
                  style={{
                    border: `1px solid ${
                      errors.email ? redBorder : darkGrayBorder
                    }`,
                  }}
                />
                <input
                  className={styles.input_field}
                  type="text"
                  placeholder="Subject"
                  name="subject"
                  {...register("subject")}
                  style={{
                    border: `1px solid ${
                      errors.subject ? redBorder : darkGrayBorder
                    }`,
                  }}
                />
                <textarea
                  className={styles.input_field}
                  placeholder="Your message"
                  rows="6"
                  name="message"
                  {...register("message")}
                  style={{
                    border: `1px solid ${
                      errors.message ? redBorder : darkGrayBorder
                    }`,
                  }}
                ></textarea>
                {messageSent && (
                  <button className={styles.submit_button}>Send</button>
                )}
                {!messageSent && (
                  <p className={styles.message_status}>Nodemailer is broken.</p>
                )}
                {messageSent && (
                  <p className={styles.message_status}>
                    Your message has been sent successfully.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default contact;
