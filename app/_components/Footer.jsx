import React from 'react'

function Footer() {
  return (
    <footer className="bg-purple-600 text-white py-4 mt-10">
      <div className="container mx-auto text-center">
        <p className="text-sm">© 2025 Your Company Name. All rights reserved.</p>
        <div className="mt-2">
          <a href="#" className="text-sm hover:text-purple-300 mx-3">Privacy Policy</a>
          <a href="#" className="text-sm hover:text-purple-300 mx-3">Terms of Service</a>
          <a href="#" className="text-sm hover:text-purple-300 mx-3">Contact Us</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer