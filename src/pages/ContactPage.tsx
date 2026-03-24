import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { SITE_CONFIG, sitePhoneTelHref } from "@/config/settings";
import { Mail, MapPin, Send, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(30),
  enquiryType: z.string().min(1, "Please select an enquiry type"),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type ContactForm = z.infer<typeof contactSchema>;

const enquiryTypes = [
  "Catering Order",
  "Kitchen Hire",
  "General Enquiry",
  "Press / Media",
];

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const preselectedType = searchParams.get("type") === "kitchen-hire" ? "Kitchen Hire" : "";
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      enquiryType: preselectedType,
    },
  });

  const onSubmit = async (data: ContactForm) => {
    console.log("Contact form submitted:", data);
    setSubmitted(true);
    toast.success("Thank you! We'll be in touch shortly.");
  };

  return (
    <Layout>
      <section className="bg-deep-purple text-deep-purple-foreground px-4 py-8 md:px-8 md:py-10">
        <div className="container mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="font-body text-lg text-white max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re looking to cater your next event or enquire about kitchen hire, we&apos;d love to hear
            from you.
          </p>
        </div>
      </section>

      <section className="section-padding contact-section-mesh">
        <div className="container mx-auto max-w-5xl space-y-10 lg:space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info - cards only; map sits below on lg */}
            <div className="lg:col-span-1 space-y-6">
              <div className="card-saathi-on-sand">
                <div className="flex items-start gap-3">
                  <Mail size={20} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-label text-sm font-semibold text-deep-purple">Email</h3>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-saathi-on-sand">
                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-label text-sm font-semibold text-deep-purple">Phone</h3>
                    <a href={sitePhoneTelHref()} className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-saathi-on-sand">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-label text-sm font-semibold text-deep-purple">Location</h3>
                    <p className="font-body text-sm text-muted-foreground">{SITE_CONFIG.address}</p>
                    <p className="font-label text-xs text-muted-foreground mt-1">Collection only. We do not currently offer delivery</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="card-midcentury-on-sand text-center py-12 p-6">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <Send size={28} className="text-success" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-deep-purple mb-2">Message Sent!</h2>
                  <p className="font-body text-muted-foreground">Thank you for getting in touch. We'll respond as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="card-midcentury-on-sand space-y-6 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-label text-sm font-medium text-deep-purple block mb-1">Full Name *</label>
                      <input
                        {...register("name")}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="Your name"
                      />
                      {errors.name && <p className="font-label text-xs text-destructive mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="font-label text-sm font-medium text-deep-purple block mb-1">Email *</label>
                      <input
                        {...register("email")}
                        type="email"
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="you@company.com"
                      />
                      {errors.email && <p className="font-label text-xs text-destructive mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-label text-sm font-medium text-deep-purple block mb-1">Phone</label>
                      <input
                        {...register("phone")}
                        type="tel"
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="Optional, e.g. 07xxx xxx xxx"
                      />
                      {errors.phone && <p className="font-label text-xs text-destructive mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label className="font-label text-sm font-medium text-deep-purple block mb-1">Enquiry Type *</label>
                      <select
                        {...register("enquiryType")}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      >
                        <option value="">Select an option</option>
                        {enquiryTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      {errors.enquiryType && <p className="font-label text-xs text-destructive mt-1">{errors.enquiryType.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="font-label text-sm font-medium text-deep-purple block mb-1">Message *</label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                      placeholder="Tell us about your event or enquiry..."
                    />
                    {errors.message && <p className="font-label text-xs text-destructive mt-1">{errors.message.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary-pill w-full md:w-auto disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Full-width map below info + form on lg; below form on small screens */}
          <div className="w-full">
            <div className="card-midcentury-on-sand h-[240px] sm:h-[260px] lg:h-[300px] w-full overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.5!2d-1.8881!3d52.4966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870bc8a5a3c9e9b%3A0x2e3b0c3f1a2b4c5d!2sSaathi%20House%2C%2049%20Bevington%20Rd%2C%20Aston%2C%20Birmingham%20B6%206HR!5e0!3m2!1sen!2suk!4v1710000000000!5m2!1sen!2suk"
                width="100%"
                height="100%"
                className="h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Saathi House location on Google Maps"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
