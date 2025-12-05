import "./NavBar.css";

export default function Navbar() {
  return (
    <nav>
      <div>
        {/* <img we will create a lot then I will uncomment this
          src="/MiddBinLogo.jpeg"
          alt="MiddBin Logo"
          style={{ width: "120px", height: "120px" }}
        /> */}
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