function Contact() {
  return (
    <main className="main">
      <div className="container">
        <h1>Contact Us</h1>

        <div className="grid">
          <div className="card p-lg">
            <h2>Get In Touch</h2>
            <p className="mb-md">
              Have questions about Smart Wallet? We'd love to hear from you!
            </p>
            <div style={{ textAlign: 'left' }}>
              <p><strong>Email:</strong> hello@smartwallet.app</p>
              <p><strong>Discord:</strong> smartwallet#1234</p>
              <p><strong>Twitter:</strong> @smartwalletapp</p>
            </div>
          </div>

          <div className="card p-lg">
            <h2>Send Message</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  rows="5" 
                  placeholder="Tell us what you need help with..."
                  style={{ resize: 'vertical' }}
                  required
                />
              </div>
              <button type="submit" className="btn" style={{ width: '100%' }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contact;
