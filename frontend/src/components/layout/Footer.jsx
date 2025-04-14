function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-4 mt-10">
    <div className="container mx-auto text-center">
      <p>© {new Date().getFullYear()} My Website. All Rights Reserved.</p>
      <div className="mt-2 flex justify-center space-x-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Twitter</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Instagram</a>
      </div>
    </div>
  </footer>
  )
}

export default Footer