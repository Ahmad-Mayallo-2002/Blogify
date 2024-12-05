"use client";
import { Container, Heading } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

interface Message {
  name: string;
  email: string;
  message: string;
}

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Message>();

  const onSubmit = (data: Message) => {
    console.log("Form Submitted:", data);
    reset(); // Reset the form after submission
  };

  return (
    <>
      <section id="contact-hero" className="h-[400px] center-flex">
        <Heading fontWeight="bold" color="white" fontSize="40px">
          Contact Us
        </Heading>
      </section>
      <section
        id="contact"
        className="dark:text-white text-gray-800 p-6 md:p-12"
      >
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
            <p className="text-lg leading-relaxed mb-6 text-center">
              Have a question, suggestion, or just want to say hello? We’d love
              to hear from you! Fill out the form below or reach us via email or
              social media.
            </p>

            {/* Contact Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="shadow-md rounded-lg p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className={`w-full px-4 py-2 border rounded-md ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full px-4 py-2 border rounded-md ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("message", { required: "Message is required" })}
                  className={`w-full resize-none h-[200px] px-4 py-2 border rounded-md ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your Message"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </Container>
      </section>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d109061.19935986486!2d31.815463!3d31.3268856!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2seg!4v1732580399945!5m2!1sar!2seg"
        className="w-full"
        height="450"
        loading="lazy"
      ></iframe>
    </>
  );
};

export default ContactUs;
