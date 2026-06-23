import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-16 lg:py-24 text-center">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Whether you have a question about our products, need a custom size, or want to partner with us, we're here to help.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Details */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0 mt-1">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone / WhatsApp</h3>
                    <a href="tel:+919624818530" className="text-gray-600 hover:text-primary transition-colors text-lg">+91 96248 18530</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0 mt-1">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <a href="mailto:info@myyunora.com" className="text-gray-600 hover:text-primary transition-colors text-lg">info@myyunora.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0 mt-1">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Factory & Office</h3>
                    <p className="text-gray-600 text-lg">Yunora Universal<br />Palanpur, Gujarat, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0 mt-1">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Working Hours</h3>
                    <p className="text-gray-600 text-lg">Monday – Saturday<br />9:00 AM – 7:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h2>
              <div className="flex gap-4">
                <a href="https://wa.me/919624818530" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-1 duration-300">
                  <FaWhatsapp className="h-7 w-7" />
                </a>
                <a href="https://instagram.com/myyunora" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm hover:shadow-md transform hover:-translate-y-1 duration-300">
                  <FaInstagram className="h-7 w-7" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-1 duration-300">
                  <FaFacebook className="h-7 w-7" />
                </a>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="h-[600px] w-full rounded-3xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116238.99503468502!2d72.16480572097365!3d24.16788358482598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395ce94b1548eebf%3A0xc3af87c94544d0f5!2sPalanpur%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Yunora Universal Location"
              className="grayscale-[30%] contrast-[90%]"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
