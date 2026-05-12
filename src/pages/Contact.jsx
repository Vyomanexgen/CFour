import {
  RiMapPinFill,
  RiPhoneFill,
  RiMailFill,
} from "@remixicon/react";

import topImg from "../assets/contactUs/top.png";

export default function Contact() {
  return (
    <div
      className="
        w-full

        bg-black
        text-white

        pt-[85px]
      "
    >
      {/* TOP BANNER */}

      <section
        className="
          relative

          w-full

          overflow-hidden
        "
      >
        <img
          src={topImg}
          alt="Contact Banner"
          className="
            h-[140px]
            w-full

            object-cover

            md:h-[170px]

            lg:h-[200px]
          "
        />

        {/* OVERLAY */}

        <div
          className="
            absolute
            inset-0

            flex
            flex-col
            items-center
            justify-center

            px-4

            text-center
          "
        >
          <h1
            className="
              font-['Oswald']
              text-[34px]
              font-bold
              uppercase

              text-white

              md:text-[46px]

              lg:text-[60px]
            "
          >
            Contact Us
          </h1>

          <p
            className="
              mt-2

              text-[16px]
              font-semibold

              text-white

              md:text-[22px]

              lg:text-[30px]
            "
          >
            “We’re here to help — reach out anytime.”
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}

      <section
        className="
          mx-auto
          max-w-[1500px]

          px-6
          py-14

          lg:px-12
        "
      >
        {/* TOP INFO */}

        <div
          className="
            grid
            gap-10

            text-center

            md:grid-cols-3
          "
        >
          {/* ADDRESS */}

          <div>
            <h2
              className="
                text-[18px]
                font-bold

                text-white

                lg:text-[38px]
              "
            >
              Address
            </h2>

            <p
              className="
                mt-3

                text-[22px]
                font-semibold
                leading-[1.4]

                text-white

                lg:text-[24px]
              "
            >
              Gachibowli, Hyderabad,
              <br />
              India
            </p>
          </div>

          {/* PHONE */}

          <div>
            <h2
              className="
                text-[18px]
                font-bold

                text-white

                lg:text-[38px]
              "
            >
              Phone Number
            </h2>

            <p
              className="
                mt-3

                text-[22px]
                font-semibold

                text-white

                lg:text-[24px]
              "
            >
              +91 7867789876
            </p>
          </div>

          {/* EMAIL */}

          <div>
            <h2
              className="
                text-[18px]
                font-bold

                text-white

                lg:text-[38px]
              "
            >
              Any Inquiries
            </h2>

            <p
              className="
                mt-3

                text-[22px]
                font-semibold

                text-white

                lg:text-[24px]
              "
            >
              cfour@gmail.com
            </p>
          </div>
        </div>

        {/* ICON LINE */}

        <div
          className="
            mt-12

            flex
            items-center
            justify-center

            gap-6
          "
        >
          {/* LEFT LINE */}

          <div
            className="
              h-[4px]
              flex-1

              rounded-full

              bg-white
            "
          />

          {/* ICONS */}

          <div
            className="
              flex
              items-center

              gap-8
            "
          >
            <RiMapPinFill size={38} />

            <RiPhoneFill size={38} />

            <RiMailFill size={38} />
          </div>

          {/* RIGHT LINE */}

          <div
            className="
              h-[4px]
              flex-1

              rounded-full

              bg-white
            "
          />
        </div>

        {/* DESCRIPTION */}

        <div
          className="
            mx-auto

            mt-14

            max-w-[1300px]

            text-center
          "
        >
          <p
            className="
              text-[18px]
              font-semibold
              leading-[1.8]

              text-white

              lg:text-[28px]
            "
          >
            We’d love to hear from you. Whether you have
            a question about our services, need support,
            or want to discuss a new project, our team is
            always ready to assist. Reach out through the
            contact form, email, or phone, and we will
            respond as quickly as possible. Your
            feedback, inquiries, and ideas are important
            to us, and we look forward to connecting with
            you and building lasting relationships based
            on trust and quality service.
          </p>
        </div>
      </section>
    </div>
  );
}