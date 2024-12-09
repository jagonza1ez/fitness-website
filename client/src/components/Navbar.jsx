export default function Navbar() {
  return (
    <div>
      <nav className="flex justify-around items-center mb-6 bg-gray-100 py-4">
        {/* MongoDB Logo */}
        <img
          alt="MongoDB logo"
          className="h-10"
          src="https://www.vectorlogo.zone/logos/mongodb/mongodb-ar21.svg"
        />

        {/* Express.js Logo */}
        <img
          alt="Express.js logo"
          className="h-10"
          src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png"
        />

        {/* React Logo */}
        <img
          alt="React logo"
          className="h-10"
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
        />

        {/* Node.js Logo */}
        <img
          alt="Node.js logo"
          className="h-10"
          src="https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg"
        />
      </nav>
    </div>
  );
}
