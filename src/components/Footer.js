import React from "react";
import { Icon } from "@iconify/react";
import "./Footer.css";
export default function Footer() {
  return (
    <div className="footer">
      <div class="social">
        <p>follow for more</p>
        <a href="https://linkedin.com/in/awais-zahid-790124197">
          <Icon icon="akar-icons:linkedin-v1-fill" />
        </a>
        <a href="https://github.com/chowais181">
          <Icon icon="fa6-brands:github-square" />
        </a>
        <p class="copyright">Ⓒ zahidawais98@gmail.com</p>
      </div>
    </div>
  );
}
