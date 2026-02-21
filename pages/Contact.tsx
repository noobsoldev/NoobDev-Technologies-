
import React, { useState } from 'react';
import { BraceWrap } from '../components/Layout';

export const Contact = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/mlgwwqbw", {
        method: "POST",
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormState('success');
        form.reset();
      } else {
        setFormState('error');
      }
    } catch (error) {
      setFormState('error');
    }
  };

  const faqs = [
    { q: 'How fast can you start?', a: 'We typically initiate the discovery phase within 48 hours of contract signing.' },
    { q: 'What is your pricing model?', a: 'We offer both fixed-project pricing for specific builds and monthly retainers for ongoing automation support.' },
    { q: 'Do you offer support after launch?', a: 'Absolutely. Every build includes 30 days of complimentary support, with extended maintenance plans available.' },
    { q: 'Can you work with our existing tools?', a: 'Yes, our specialty is connecting existing SaaS ecosystems (Zapier, Make, HubSpot, etc.) to work in harmony.' },
  ];

  return (
    <div className="page-transition pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Let's <BraceWrap>Build</BraceWrap> Something</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Ready to automate your workflows? Send us a message and we'll get back to you within 24 hours.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          {/* Contact Form */}
          <div className="bg-white p-10 border border-gray-100 shadow-xl">
            {formState === 'success' ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-6">✓</div>
                <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                <p className="text-gray-600 mb-8">Success! We've received your data and will contact you shortly.</p>
                <button 
                    onClick={() => setFormState('idle')}
                    className="text-[#FF0000] font-mono font-bold hover:underline"
                >
                  $ send_another_message.sh
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase mb-2">Name *</label>
                    <input required name="name" type="text" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-[#FF0000]" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase mb-2">Email *</label>
                    <input required name="email" type="email" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-[#FF0000]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase mb-2">Phone</label>
                    <div className="flex">
                      <select name="countryCode" className="w-24 bg-gray-50 border border-gray-200 border-r-0 px-2 py-3 focus:outline-none focus:border-[#FF0000] appearance-none text-sm">
                        <option value="+1">+1 (US)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+91">+91 (IN)</option>
                        <option value="+61">+61 (AU)</option>
                        <option value="+81">+81 (JP)</option>
                        <option value="+49">+49 (DE)</option>
                        <option value="+33">+33 (FR)</option>
                        <option value="+86">+86 (CN)</option>
                        <option value="+971">+971 (UAE)</option>
                      </select>
                      <input name="phone" type="tel" className="flex-1 w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-[#FF0000]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase mb-2">Service Interest</label>
                    <select name="service" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-[#FF0000] appearance-none">
                      <option>AI Automation</option>
                      <option>Custom Website</option>
                      <option>Landing Pages</option>
                      <option>SEO Services</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase mb-2">Message *</label>
                  <textarea required name="message" rows={4} className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-[#FF0000] resize-none"></textarea>
                </div>
                
                {formState === 'error' && (
                  <div className="text-red-600 text-sm font-bold text-center">
                    Something went wrong. Please try again.
                  </div>
                )}

                <button 
                  disabled={formState === 'submitting'}
                  className="w-full bg-[#FF0000] text-white py-4 font-bold text-lg hover:bg-black transition-all disabled:bg-gray-400"
                >
                  {formState === 'submitting' ? 'Sending...' : '{Send Message} →'}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info & FAQ */}
          <div>
            <div className="space-y-12 mb-20">
              <div>
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">Location & Hours</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="font-bold text-lg mb-1">San Francisco, CA</p>
                    <p className="text-gray-500 text-sm">Remote worldwide</p>
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1">Mon - Fri</p>
                    <p className="text-gray-500 text-sm">9AM - 6PM (PST)</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">Direct Contact</h4>
                <div className="space-y-4">
                  <a href="mailto:hello@noobdev.studio" className="block font-bold text-2xl hover:text-[#FF0000] transition-colors">hello@noobdev.studio</a>
                  <p className="text-xl font-bold">+1 (555) 012-3456</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-8 border-b border-gray-100 pb-2">Frequently Asked Questions</h4>
              <div className="space-y-6">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="group">
                    <h5 className="font-bold mb-2 flex items-center">
                      <span className="text-[#FF0000] mr-2">{"{"}?{"}"}</span> {faq.q}
                    </h5>
                    <p className="text-gray-600 text-sm leading-relaxed pl-6">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
