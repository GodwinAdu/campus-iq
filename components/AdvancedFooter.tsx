import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react"

export default function AdvancedFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Campus<span className="text-blue-500">IQ</span></h3>
            <p className="text-gray-400">Revolutionizing school management with cutting-edge technology.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-gray-400 hover:text-white transition duration-300">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white transition duration-300">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="support" className="text-gray-400 hover:text-white transition duration-300">
                  Support
                </Link>
              </li>
              
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/subcription_agreement" className="text-gray-400 hover:text-white transition duration-300">
                Subscription Agreement
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-gray-400 hover:text-white transition duration-300">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/schedule-demo" className="text-gray-400 hover:text-white transition duration-300">
                  Schedule a Demo
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Linkedin size={24} />
              </a>
            </div>
            <div className="mt-4">
              <a
                href="mailto:info@edumanagepro.com"
                className="text-gray-400 hover:text-white transition duration-300 flex items-center"
              >
                <Mail size={18} className="mr-2" />
                info@edumanagepro.com
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} EduManage Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

