import { useEffect, useState } from "react";
import { RiMapPinFill, RiPhoneFill, RiMailFill } from "@remixicon/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getPublicPage } from "../api/contentApi";
import { submitContactUsForm } from "../api/storefrontApi";
import { useToast } from "../context/ToastContext";

import topImg from "../assets/contactUs/top.webp";

export default function Contact() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const { data: pageData, isLoading } = useQuery({
    queryKey: ["content", "contact-us"],
    queryFn: () => getPublicPage("contact-us"),
  });

  const mutation = useMutation({
    mutationFn: submitContactUsForm,
    onSuccess: () => {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    },
    onError: () => {
      toast.error("Failed to send message. Please try again.");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    mutation.mutate(formData);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
            {pageData?.title || "Contact Us"}
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
            {pageData?.subtitle || ""}
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

          <a
            href="https://maps.google.com/?q=Gachibowli,Hyderabad,India"
            target="_blank"
            rel="noopener noreferrer"
            className="
              rounded-2xl
              border
              border-white/10

              bg-white/5

              p-8

              transition-all
              duration-300

              hover:-translate-y-2
              hover:bg-white/10
            "
          >
            <h2
              className="
                text-[18px]
                font-bold

                text-white

                lg:text-[34px]
              "
            >
              Address
            </h2>

            <p
              className="
                mt-3

                text-[20px]
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
          </a>

          {/* PHONE */}

          <a
            href="tel:+917867789876"
            className="
              rounded-2xl
              border
              border-white/10

              bg-white/5

              p-8

              transition-all
              duration-300

              hover:-translate-y-2
              hover:bg-white/10
            "
          >
            <h2
              className="
                text-[18px]
                font-bold

                text-white

                lg:text-[34px]
              "
            >
              Phone Number
            </h2>

            <p
              className="
                mt-3

                text-[20px]
                font-semibold

                text-white

                lg:text-[24px]
              "
            >
              +91 7867789876
            </p>
          </a>

          {/* EMAIL */}

          <a
            href="mailto:contact@cfour.com"
            className="
              rounded-2xl
              border
              border-white/10

              bg-white/5

              p-8

              transition-all
              duration-300

              hover:-translate-y-2
              hover:bg-white/10
            "
          >
            <h2
              className="
                text-[18px]
                font-bold

                text-white

                lg:text-[34px]
              "
            >
              Any Inquiries
            </h2>

            <p
              className="
                mt-3

                text-[20px]
                font-semibold

                text-white

                lg:text-[24px]
              "
            >
              contact@cfour.com
            </p>
          </a>
        </div>

        {/* ICON LINE */}

        <div
          className="
            mt-14

            flex
            items-center
            justify-center

            gap-6
          "
        >
          <div
            className="
              h-[4px]
              flex-1

              rounded-full

              bg-white
            "
          />

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

          <div
            className="
              h-[4px]
              flex-1

              rounded-full

              bg-white
            "
          />
        </div>

        {/* CONTACT FORM */}

        <div
          className="
            mx-auto

            mt-20

            max-w-[1000px]

            rounded-[32px]
            border
            border-white/10

            bg-white/5

            p-8

            backdrop-blur-md

            md:p-14
          "
        >
          <div className="text-center">
            <h2
              className="
                font-['Oswald']
                text-[34px]
                font-bold
                uppercase

                text-white

                md:text-[52px]
              "
            >
              Reach Out To Us
            </h2>

            <p
              className="
                mt-3

                text-[16px]

                text-gray-300

                md:text-[18px]
              "
            >
              Fill out the form below and our team will contact you shortly.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="
              mt-12

              grid
              gap-6

              md:grid-cols-2
            "
          >
            {/* NAME */}

            <div className="flex flex-col">
              <label
                className="
                  mb-2

                  text-[15px]
                  font-semibold

                  text-gray-300
                "
              >
                Full Name *
              </label>

              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="
                  rounded-xl
                  border
                  border-white/10

                  bg-black/40

                  px-5
                  py-4

                  text-white

                  outline-none

                  transition-all
                  duration-300

                  focus:border-red-500
                "
              />
            </div>

            {/* EMAIL */}

            <div className="flex flex-col">
              <label
                className="
                  mb-2

                  text-[15px]
                  font-semibold

                  text-gray-300
                "
              >
                Email Address *
              </label>

              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="
                  rounded-xl
                  border
                  border-white/10

                  bg-black/40

                  px-5
                  py-4

                  text-white

                  outline-none

                  transition-all
                  duration-300

                  focus:border-red-500
                "
              />
            </div>

            {/* PHONE */}

            <div className="flex flex-col">
              <label
                className="
                  mb-2

                  text-[15px]
                  font-semibold

                  text-gray-300
                "
              >
                Phone Number
              </label>

              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter your phone number"
                className="
                  rounded-xl
                  border
                  border-white/10

                  bg-black/40

                  px-5
                  py-4

                  text-white

                  outline-none

                  transition-all
                  duration-300

                  focus:border-red-500
                "
              />
            </div>

            {/* SUBJECT */}

            <div className="flex flex-col">
              <label
                className="
                  mb-2

                  text-[15px]
                  font-semibold

                  text-gray-300
                "
              >
                Subject
              </label>

              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Enter subject"
                className="
                  rounded-xl
                  border
                  border-white/10

                  bg-black/40

                  px-5
                  py-4

                  text-white

                  outline-none

                  transition-all
                  duration-300

                  focus:border-red-500
                "
              />
            </div>

            {/* MESSAGE */}

            <div className="md:col-span-2 flex flex-col">
              <label
                className="
                  mb-2

                  text-[15px]
                  font-semibold

                  text-gray-300
                "
              >
                Message *
              </label>

              <textarea
                rows="6"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your message..."
                className="
                  resize-none

                  rounded-xl
                  border
                  border-white/10

                  bg-black/40

                  px-5
                  py-4

                  text-white

                  outline-none

                  transition-all
                  duration-300

                  focus:border-red-500
                "
              />
            </div>

            {/* BUTTON */}

            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                disabled={mutation.isPending}
                className="
                  rounded-full

                  bg-red-600

                  px-10
                  py-4

                  text-[15px]
                  font-semibold
                  uppercase
                  tracking-wide

                  text-white

                  transition-all
                  duration-300

                  hover:-translate-y-2
                  hover:bg-red-700
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  disabled:hover:translate-y-0
                "
              >
                {mutation.isPending ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>

        {/* DESCRIPTION */}

        <div
          className="
            mx-auto

            mt-20

            max-w-[1300px]

            text-center
          "
        >
          {isLoading ? (
            <div className="animate-pulse space-y-3 max-w-[800px] mx-auto">
              <div className="h-4 bg-gray-600 rounded w-full"></div>
              <div className="h-4 bg-gray-600 rounded w-full"></div>
              <div className="h-4 bg-gray-600 rounded w-5/6"></div>
            </div>
          ) : (
            <div 
              className="text-[18px] font-semibold leading-[1.8] text-white lg:text-[28px] prose prose-invert mx-auto"
              dangerouslySetInnerHTML={{ __html: pageData?.body || `
                <p>Content coming soon. The store administrator is currently updating this page.</p>
              `}}
            />
          )}
        </div>

        {/* MAP */}

        <div
          className="
            mt-14

            w-full

            overflow-hidden
            rounded-2xl
          "
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2963603480784!2d78.32860497516473!3d17.440089583436!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d69df%3A0x19688beb557fa0ee!2sGachibowli%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      </section>
    </div>
  );
}
