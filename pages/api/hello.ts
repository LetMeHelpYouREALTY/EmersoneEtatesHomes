
// Next.js API route for handling real estate inquiries
import type { NextApiRequest, NextApiResponse } from 'next'

type InquiryData = {
  message: string
  timestamp: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<InquiryData>
) {
  if (req.method === 'POST') {
    // Handle inquiry submission
    const { name } = req.body;
    
    // In a real application, you would save this to a database
    // and send notifications to the sales team
    
    res.status(200).json({ 
      message: `Thank you for your inquiry, ${name}! Our team will contact you within 24 hours.`,
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(200).json({ 
      message: 'Emerson Estates Sales API - Ready to serve',
      timestamp: new Date().toISOString()
    });
  }
}
