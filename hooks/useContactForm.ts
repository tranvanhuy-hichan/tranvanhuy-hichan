'use client';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const empty = { name: '', email: '', subject: '', message: '' };

export function useContactForm() {
  const [form, setForm] = useState({ ...empty });
  const [errors, setErrors] = useState({ ...empty });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const setField = (key: keyof typeof empty, value: string) => setForm((f) => ({ ...f, [key]: value }));

  function validate() {
    const e = { ...empty };
    let valid = true;
    if (!form.name.trim() || form.name.trim().length < 2) {
      e.name = 'Name must be at least 2 characters long';
      valid = false;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email address';
      valid = false;
    }
    if (!form.subject.trim() || form.subject.trim().length < 3) {
      e.subject = 'Subject must be at least 3 characters long';
      valid = false;
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      e.message = 'Message must be at least 10 characters long';
      valid = false;
    }
    setErrors(e);
    return valid;
  }

  async function submit() {
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey || serviceId === 'your_service_id') {
        console.warn('EmailJS environment variables not configured. Running in simulation mode.');
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } else {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject,
            message: form.message,
            reply_to: form.email,
            name: form.name,
            email: form.email,
            title: form.subject,
          },
          publicKey
        );
      }
      setSubmitStatus('success');
      setForm({ ...empty });
    } catch (err: any) {
      console.error('Email send error:', err);
      setSubmitStatus('error');
      setErrorMessage(err?.text || err?.message || String(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return { form, setField, errors, isSubmitting, submitStatus, errorMessage, submit, validate };
}
