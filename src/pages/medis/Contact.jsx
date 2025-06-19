import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "EMERGENCY",
    content: "(237) 681-812-255",
    description: "Emergency hotline available 24/7",
    color: "bg-red-100 text-red-600"
  },
  {
    icon: MapPin,
    title: "LOCATION",
    content: "0123 Some place, Some country",
    description: "Our main hospital location",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Mail,
    title: "EMAIL",
    content: "filidule@gmail.com",
    description: "Send us your queries anytime",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Clock,
    title: "WORKING HOURS",
    content: "09:00 - 20:00 Everyday",
    description: "Mon to Sun 9:00 AM to 8:00 PM",
    color: "bg-green-100 text-green-600"
  }
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-blue-200">
            We're here to help and answer any questions you might have
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center">
                <div className={`w-16 h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <info.icon size={24} />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{info.title}</h3>
                <p className="text-lg font-semibold text-gray-900 mb-1">{info.content}</p>
                <p className="text-sm text-gray-600">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <MessageSquare className="mr-3 text-blue-600" />
                  Send us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Have a question or need to schedule an appointment? Fill out the form below and we'll get back to you as soon as possible.
                </p>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select 
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="appointment">Appointment Inquiry</option>
                      <option value="medical">Medical Question</option>
                      <option value="billing">Billing Inquiry</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea 
                      rows={6}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your message here..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center"
                  >
                    <Send className="mr-2" size={18} />
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto mb-2 text-blue-600" size={48} />
                  <h3 className="text-xl font-semibold text-blue-800">Interactive Map</h3>
                  <p className="text-blue-600">Find us at our main location</p>
                </div>
              </div>

              {/* Additional Contact Info */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="text-blue-600" size={20} />
                    <div>
                      <p className="font-semibold">Emergency Hotline</p>
                      <p className="text-gray-600">(237) 681-812-255</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="text-blue-600" size={20} />
                    <div>
                      <p className="font-semibold">General Inquiries</p>
                      <p className="text-gray-600">filidule@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="text-blue-600" size={20} />
                    <div>
                      <p className="font-semibold">Working Hours</p>
                      <p className="text-gray-600">Mon-Sun: 09:00 - 20:00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="bg-blue-800 text-white p-3 rounded-full hover:bg-blue-900 transition">
                    <Linkedin size={20} />
                  </a>
                </div>
                <p className="text-gray-600 mt-4">
                  Stay connected with us for health tips, news, and updates about our services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  question: "How do I schedule an appointment?",
                  answer: "You can schedule an appointment by calling our hotline, using our online booking system, or visiting our hospital directly."
                },
                {
                  question: "What should I bring to my appointment?",
                  answer: "Please bring a valid ID, insurance card (if applicable), list of current medications, and any relevant medical records."
                },
                {
                  question: "Do you accept insurance?",
                  answer: "Yes, we accept most major insurance plans. Please contact us to verify if your specific plan is accepted."
                },
                {
                  question: "What are your emergency procedures?",
                  answer: "For emergencies, call our emergency hotline immediately or visit our emergency department which is open 24/7."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}