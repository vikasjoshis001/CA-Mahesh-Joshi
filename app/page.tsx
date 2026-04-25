export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Design System Preview */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Mahesh Joshi & Associates
          </h1>
          <p className="text-xl text-muted-foreground">
            Chartered Accountant
          </p>
          <p className="text-foreground mt-2">
            Professional CA Services in Wakad, Pimpri Chinchwad
          </p>
        </div>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Design System Colors
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primary Colors */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Primary (Navy Blue)
              </h3>
              <div className="bg-primary-light h-20 rounded-lg flex items-center justify-center text-white font-medium">
                Primary Light
              </div>
              <div className="bg-primary h-20 rounded-lg flex items-center justify-center text-white font-medium">
                Primary
              </div>
              <div className="bg-primary-dark h-20 rounded-lg flex items-center justify-center text-white font-medium">
                Primary Dark
              </div>
            </div>

            {/* Secondary Colors */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Secondary (Orange)
              </h3>
              <div className="bg-secondary-light h-20 rounded-lg flex items-center justify-center text-white font-medium">
                Secondary Light
              </div>
              <div className="bg-secondary h-20 rounded-lg flex items-center justify-center text-white font-medium">
                Secondary
              </div>
              <div className="bg-secondary-dark h-20 rounded-lg flex items-center justify-center text-white font-medium">
                Secondary Dark
              </div>
            </div>

            {/* Accent Colors */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Accent (Green)
              </h3>
              <div className="bg-accent-light h-20 rounded-lg flex items-center justify-center text-white font-medium">
                Accent Light
              </div>
              <div className="bg-accent h-20 rounded-lg flex items-center justify-center text-white font-medium">
                Accent
              </div>
              <div className="bg-accent-dark h-20 rounded-lg flex items-center justify-center text-white font-medium">
                Accent Dark
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Button Styles
          </h2>

          <div className="flex flex-wrap gap-4">
            <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors">
              Primary Button
            </button>

            <button className="bg-secondary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary-dark transition-colors">
              Secondary Button
            </button>

            <button className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-dark transition-colors">
              Accent Button
            </button>

            <button className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors">
              Outline Button
            </button>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Card Components
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary rounded-lg mb-4 flex items-center justify-center text-white text-xl font-bold">
                IT
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                Income Tax Services
              </h3>
              <p className="text-muted-foreground">
                Comprehensive tax filing and planning services for individuals and businesses.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-secondary rounded-lg mb-4 flex items-center justify-center text-white text-xl font-bold">
                GST
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                GST Services
              </h3>
              <p className="text-muted-foreground">
                Complete GST registration, filing, and compliance management.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent rounded-lg mb-4 flex items-center justify-center text-white text-xl font-bold">
                AU
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                Audit Services
              </h3>
              <p className="text-muted-foreground">
                Professional audit services ensuring compliance and accuracy.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="bg-muted rounded-lg p-8">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-foreground">
            <div>
              <p className="font-semibold mb-2">Phone:</p>
              <p className="text-muted-foreground">+91 9130601393</p>
            </div>

            <div>
              <p className="font-semibold mb-2">Email:</p>
              <p className="text-muted-foreground">camaheshjoshi25@gmail.com</p>
            </div>

            <div className="md:col-span-2">
              <p className="font-semibold mb-2">Address:</p>
              <p className="text-muted-foreground">
                607, 6th Floor, ANP Landmark, Near Bhumkar Chowk,<br />
                Bhumkar Nagar, Wakad, Pimpri Chinchwad, Maharashtra - 411 057
              </p>
            </div>
          </div>
        </section>

        {/* Note */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            ✅ Design System Configured | Colors extracted from CA India logo
          </p>
        </div>
      </div>
    </div>
  );
}
