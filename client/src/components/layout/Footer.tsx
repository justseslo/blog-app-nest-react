import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
export default function Footer() {
  return (
    <div className="w-full bg-emerald-800 text-white rounded-tl-4xl rounded-tr-4xl p-5 mt-10">
      <div className="ml-10">
        <h2 className="text-4xl font-bold">The Chronicle</h2>
        <p className="text-gray-400 mt-2 max-w-3xl">
          Welcome to The Chronicle, where we investigate compelling stories,
          uncover hidden truths, and explore the mysteries of our world. From
          Baker Street to beyond, we bring you thoughtful analysis, captivating
          narratives, and insights that matter.
        </p>
      </div>
      <div className="ml-10 mt-5">
        <h3 className="text-3xl">Follow Us</h3>
        <div className="flex gap-10 mt-2">
          <a
            href="https://www.linkedin.com/in/mansur-rahimli-6aba76381/"
            target="_blank"
          >
            <FaLinkedin size={35} />
          </a>
          <a href="https://github.com/justseslo/justseslo" target="_blank">
            <FaGithub size={35} />
          </a>
          <a href="https://www.instagram.com/justseslo/" target="_blank">
            <FaSquareInstagram size={35} />
          </a>
        </div>
      </div>
      <div className="ml-10 flex justify-around mt-10">
        <div className="flex items-center gap-2">
          <FaLocationDot size={40} />
          <div>
            <h2 className="text-3xl">Find Us</h2>
            <p>221B Baker Street, London NW1 6XE, UK</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaPhoneAlt size={40} />
          <div>
            <h2 className="text-3xl">Call Us</h2>
            <p> +44 20 7946 0958</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <IoMdMail size={40} />
          <div>
            <h2 className="text-3xl">Mail Us</h2>
            <p>info@blogsite.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
