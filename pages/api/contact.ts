
import type { NextApiRequest, NextApiResponse } from 'next';
import { ContactFormData } from '@/types';

interface ContactApiRequest extends NextApiRequest {
  body: ContactFormData;
}

interface ApiErrorResponse {
  message: string;
  success: false;
  error?: string;
}

interface ApiSuccessResponse {
  message: string;
  success: true;
  data?: {
    submittedAt: string;
    name: string;
  };
}

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

export default function handler(
  req: ContactApiRequest,
  res: NextApiResponse<ApiResponse>
): void {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method not allowed',
      success: false
    });
  }

  try {
    const { name, email, phone, message, propertyInterest }: ContactFormData = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        message: 'Missing required fields: name, email, and message are required',
        success: false
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Invalid email format',
        success: false
      });
    }

    // Here you would typically save to database or send email
    console.log('Contact form submission:', {
      name,
      email,
      phone: phone || 'Not provided',
      message,
      propertyInterest: propertyInterest || 'Not specified',
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({
      message: 'Contact form submitted successfully',
      success: true,
      data: {
        submittedAt: new Date().toISOString(),
        name
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      message: 'Internal server error',
      success: false
    });
  }
}
