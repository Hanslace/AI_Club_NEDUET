"use client";

import Image from "next/image";
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="relative bg-[#F4EFE6] rounded-t-[60px] px-[6vw] py-[3rem] flex flex-col items-center text-primary1 overflow-hidden ">
      <div className="w-full max-w-[1300px] grid grid-cols-1 md:grid-cols-4 gap-[3rem] text-center md:text-left place-items-center md:place-items-start">
        
        {/* 🧠 Logo & Objective */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-[80%] max-w-[160px] aspect-square overflow-hidden rounded-full">
            <Image
              src="/images/footer_logo.svg"
              alt="AI Club Logo"
              fill
              className="object-contain scale-100"
            />
          </div>

          <p className="font-poppins text-[16px] leading-[24px] max-w-[280px] mt-4">
            AI Club’s objective is to promote Artificial Intelligence education and fund startups created by its members.
          </p>
        </div>


        {/* 🔗 Important Links */}
        <div>
          <h3 className="font-space-grotesk text-[24px] text-primary2 font-bold uppercase mb-4">
            Important Links
          </h3>
          <ul className="flex flex-col gap-2 font-poppins text-[18px]">
            <li className="hover:text-primary2 transition-colors cursor-pointer">About Us</li>
            <li className="hover:text-primary2 transition-colors cursor-pointer">Our Teams</li>
            <li className="hover:text-primary2 transition-colors cursor-pointer">Our Projects</li>
            <li className="hover:text-primary2 transition-colors cursor-pointer">Our Blogs</li>
            <li className="hover:text-primary2 transition-colors cursor-pointer">Events</li>
            <li className="hover:text-primary2 transition-colors cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* 📞 Contact Info */}
        <div>
          <h3 className="font-space-grotesk text-[24px] text-primary2 font-bold uppercase mb-4">
            Contact Info
          </h3>
          <ul className="flex flex-col gap-4 font-poppins text-[18px]">
            <li className="flex items-start gap-3">
              <MapPin className="text-primary2 mt-1" size={22} />
              <span>
                Main University Rd, NED University of Engineering & Technology, Karachi, Sindh 75270, Pakistan
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-primary2" size={20} />
              +92 334 3304258
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-primary2" size={20} />
              info.aiclub@gmail.com
            </li>
          </ul>
        </div>

        {/* 🌐 Social Links */}
        <div>
          <h3 className="font-space-grotesk text-[24px] text-primary2 font-bold uppercase mb-4">
            Social Links
          </h3>
          <div className="flex gap-5">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[50px] h-[50px] border-[3px] border-primary2 rounded-full flex items-center justify-center hover:bg-primary2 transition-all"
            >
              <Instagram className="text-primary2 hover:text-white transition-colors" size={26} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[50px] h-[50px] border-[3px] border-primary2 rounded-full flex items-center justify-center hover:bg-primary2 transition-all"
            >
              <Linkedin className="text-primary2 hover:text-white transition-colors" size={26} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[50px] h-[50px] border-[3px] border-primary2 rounded-full flex items-center justify-center hover:bg-primary2 transition-all"
            >
              <Facebook className="text-primary2 hover:text-white transition-colors" size={26} />
            </a>
          </div>
        </div>
      </div>

      {/* 📜 Copyright */}
      <div className="mt-[4rem] text-center">
        <p className="font-poppins text-[16px]">
          Copyright © 2025. All Rights Reserved by <span className="font-semibold">AI Club - RCAI</span>
        </p>
      </div>
    </footer>
  );
}
