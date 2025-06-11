
import type { NextApiRequest, NextApiResponse } from 'next';

interface ContactData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyType: string;
  priceRange: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message, propertyType, priceRange }: ContactData = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Log the contact submission (in production, you'd save to database)
    console.log('New contact submission:', {
      name,
      email,
      phone,
      message,
      propertyType,
      priceRange,
      timestamp: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    });

    // In production, integrate with:
    // - CRM system (Salesforce, HubSpot)
    // - Email service (SendGrid, Mailgun)
    // - Database (PostgreSQL, MongoDB)
    
    // Send notification email to agent
    // await sendNotificationEmail({...contactData});
    
    // Send confirmation email to client
    // await sendConfirmationEmail(email, name);

    res.status(200).json({ 
      success: true, 
      message: 'Contact form submitted successfully' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
