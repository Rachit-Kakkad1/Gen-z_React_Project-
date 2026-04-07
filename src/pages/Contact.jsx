import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FaPhone, FaEnvelope, FaLocationDot, FaClock, FaPaperPlane, FaCircleCheck } from 'react-icons/fa6'
import Footer from '../components/Footer'

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]{10,15}$/, 'Invalid phone number')
    .required('Phone number is required'),
  subject: Yup.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters')
    .required('Subject is required'),
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must be less than 500 characters')
    .required('Message is required'),
})

const contactInfo = [
  {
    icon: <FaPhone className="text-xl" />,
    title: 'Phone',
    details: ['+91 98765 43210', '+91 12345 67890'],
  },
  {
    icon: <FaEnvelope className="text-xl" />,
    title: 'Email',
    details: ['hello@genzagency.com', 'support@genzagency.com'],
  },
  {
    icon: <FaLocationDot className="text-xl" />,
    title: 'Office',
    details: ['123 Innovation Hub, Tech Park', 'Bangalore, India 560001'],
  },
  {
    icon: <FaClock className="text-xl" />,
    title: 'Working Hours',
    details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
  },
]

export default function Contact() {
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  }

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    const existingContacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]')
    const newSubmission = {
      ...values,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
    }
    existingContacts.push(newSubmission)
    localStorage.setItem('contactSubmissions', JSON.stringify(existingContacts))
    resetForm()
    setSubmitting(false)
    alert('Message sent successfully! We will get back to you soon.')
  }

  return (
    <div className="bg-white text-gray-800 min-h-screen">

      {/* Hero Section */}
      <section className="pt-40 pb-16 px-6 sm:px-12 md:px-24 lg:px-40 text-center bg-amber-50">
        <span className="inline-block bg-amber-100 text-amber-500 text-sm font-semibold px-4 py-1 rounded-full mb-6 tracking-wide uppercase">
          Get In Touch
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900">
          Let's Start a{' '}
          <span className="text-amber-500">Conversation</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
          Have a project in mind or just want to say hi? We'd love to hear from you.
          Fill out the form below and our team will get back to you within 24 hours.
        </p>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-6 sm:px-12 md:px-24 lg:px-40 bg-white">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-6 text-center hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 shadow-sm"
            >
              <div className="w-14 h-14 bg-amber-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white shadow-md">
                {info.icon}
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-3">{info.title}</h3>
              {info.details.map((detail, i) => (
                <p key={i} className="text-gray-500 text-sm leading-relaxed">
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-6 sm:px-12 md:px-24 lg:px-40 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-amber-100 text-amber-500 text-sm font-semibold px-4 py-1 rounded-full mb-4 tracking-wide uppercase">
              Send Us a Message
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Fill Out the Form
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              We're here to help and answer any question you might have. We look forward to hearing from you.
            </p>
          </div>

          <div className="bg-white border border-amber-100 rounded-3xl p-8 sm:p-10 shadow-md">
            <Formik
              initialValues={initialValues}
              validationSchema={contactSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors }) => (
                <Form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-xl border-2 bg-amber-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 ${
                          touched.name && errors.name ? 'border-red-400' : 'border-amber-100'
                        }`}
                      />
                      <ErrorMessage
                        name="name"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="john@example.com"
                        className={`w-full px-4 py-3 rounded-xl border-2 bg-amber-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 ${
                          touched.email && errors.email ? 'border-red-400' : 'border-amber-100'
                        }`}
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Field
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+91 98765 43210"
                        className={`w-full px-4 py-3 rounded-xl border-2 bg-amber-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 ${
                          touched.phone && errors.phone ? 'border-red-400' : 'border-amber-100'
                        }`}
                      />
                      <ErrorMessage
                        name="phone"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject
                      </label>
                      <Field
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="Project Inquiry"
                        className={`w-full px-4 py-3 rounded-xl border-2 bg-amber-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 ${
                          touched.subject && errors.subject ? 'border-red-400' : 'border-amber-100'
                        }`}
                      />
                      <ErrorMessage
                        name="subject"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <Field
                      as="textarea"
                      id="message"
                      name="message"
                      rows="5"
                      placeholder="Tell us about your project..."
                      className={`w-full px-4 py-3 rounded-xl border-2 bg-amber-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 resize-none ${
                        touched.message && errors.message ? 'border-red-400' : 'border-amber-100'
                      }`}
                    />
                    <ErrorMessage
                      name="message"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-500 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <FaCircleCheck className="animate-pulse" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send Message
                      </>
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>

      {/* Map / CTA Section */}
      <section className="py-20 px-6 sm:px-12 md:px-24 lg:px-40 text-center bg-amber-50">
        <div className="bg-white border border-amber-200 rounded-3xl py-16 px-6 shadow-md">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-900">
            Still Have Questions?
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Don't hesitate to reach out. Our team is always ready to help you with any inquiry.
          </p>
          <a
            href="mailto:hello@genzagency.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-black font-bold rounded-full hover:bg-amber-500 transition-all duration-300 shadow"
          >
            <FaEnvelope />
            Email Us Directly
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
