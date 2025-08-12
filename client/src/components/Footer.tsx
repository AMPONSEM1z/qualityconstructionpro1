import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">BuildPro Construction</h3>
            <p className="text-white/80 mb-4">
              Quality construction services you can trust. We're committed to
              delivering exceptional results for every project, big or small.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-accent" />
                <span className="text-white/80">(054) 857-8274</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-accent" />
                <span className="text-white/80">
                  info@buildproconstruction.com
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-accent" />
                <span className="text-white/80">
                  Meri-Crescent School, Pokuase, Amasaman{" "}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
            <div className="space-y-2 text-white/80">
              <p>Monday - Friday: 7:00 AM - 6:00 PM</p>
              <p>Saturday: 8:00 AM - 4:00 PM</p>
              <p>Sunday: Emergency calls only</p>
              <p className="text-accent font-semibold mt-3">
                24/7 Emergency Service Available
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60">
            © 2025 BuildPro Construction. All rights reserved. Licensed &
            Insured.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
