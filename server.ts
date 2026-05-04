import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

  // API Route for enquiries
  app.post("/api/enquiry", async (req, res) => {
    try {
      const { firstName, lastName, email, phone, message, selectedProperty } = req.body;
      const targetEmail = "braavosrealestate@gmail.com";

      console.log(`Received enquiry for ${targetEmail}:`, req.body);

      if (!resend) {
        console.warn("RESEND_API_KEY is not set. Simulation mode active.");
        return res.json({ success: true, simulated: true });
      }

      const propertyDetails = selectedProperty ? `
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; margin-bottom: 20px; border: 1px solid #eee;">
          <h2 style="color: #c5a059; margin-top: 0;">Property Interest</h2>
          <p><strong>Title:</strong> ${selectedProperty.title}</p>
          <p><strong>Price:</strong> ${selectedProperty.price || 'N/A'}</p>
          <p><strong>Location:</strong> ${selectedProperty.location}</p>
          ${selectedProperty.developer ? `<p><strong>Developer:</strong> ${selectedProperty.developer}</p>` : ''}
        </div>
      ` : '';

      const { data, error } = await resend.emails.send({
        from: 'Braavos Concierge <onboarding@resend.dev>',
        to: [targetEmail],
        subject: `New enquiry from ${firstName} ${lastName}${selectedProperty ? ' regarding ' + selectedProperty.title : ''}`,
        html: `
          <h1>New Luxury Property Enquiry</h1>
          ${propertyDetails}
          <div style="padding: 20px;">
            <p><strong>Customer details:</strong></p>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
          <hr />
          <p>This enquiry was sent via the Braavos Real Estate platform.</p>
        `,
      });

      if (error) {
        console.error("Resend Error:", error);
        return res.status(500).json({ success: false, error: error.message });
      }

      res.json({ success: true, data });
    } catch (err: any) {
      console.error("Backend Error:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
