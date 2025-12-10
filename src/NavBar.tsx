import "./NavBar.css";

export default function Navbar() {
  return (
    <nav>
      <div>
        <img
          src=".\assets\MiddLaundryLive Logo.png"
          alt="MiddBin Logo"
          className="logo"
        />
      </div>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
    </nav>
  );
}