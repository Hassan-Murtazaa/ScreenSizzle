import React from "react";
import "./FooterStyle.css";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaAddressBook,
  FaInstagram,
} from "react-icons/fa";

import { AiOutlineMail } from "react-icons/ai";
import { MdOutlineDeliveryDining } from "react-icons/md";

export default function Footer() {
  return (
    <div className="foot">
      <footer className="main-footer">
        <div className="d-flex gap-4 flex-md-row flex-wrap col-10 mt-5 mb-5">
          <div className="footer-left offset-2 pt-3">
            <h5>
              Screensizzle is a comprehensive cinema app that not only
              allows users to book cinema tickets but also offers a wide
              range of features to enhance their movie watching
              experience.
            </h5>
            <ul className="footer-social">
              <li className="d-inline me-3">
                <a href="#" id="fb">
                  <FaFacebookF />
                </a>
              </li>

              <li className="d-inline me-3">
                <a href="#" id="insta">
                  <FaInstagram />
                </a>
              </li>

              <li className="d-inline me-3">
                <a href="#" id="tweet">
                  <FaTwitter />
                </a>
              </li>

              <li className="d-inline me-3">
                <a href="#" id="gogle">
                  <FaGoogle />
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-right offset-2 pt-3">
            <div className="footer-title">Contacts</div>
            <ul className="list">
              <li>
                <FaAddressBook></FaAddressBook> +92-3161234567
              </li>
              <li>
                <AiOutlineMail></AiOutlineMail> screensizzle@info.com
              </li>
              <li>
                <MdOutlineDeliveryDining></MdOutlineDeliveryDining> P.O Box 1033 Lahore, Pakistan
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="footer-bottom">
        <div className="footer-cont">
          <div className="copyright">
            ScreenSizzle &copy; 2023 All Rights Reserved
          </div>
          <div>
            <ul class="footer-nav">
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}