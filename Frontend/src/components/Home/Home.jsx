const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="home-title">
          <h1>WELCOME</h1>
        </div>
        <div className="home-contents-card">
          <div className="home-content">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
              omnis, dignissimos voluptas sequi, ea odit deserunt necessitatibus
              praesentium, impedit magni iusto suscipit vero nemo explicabo.
              Nihil inventore voluptas natus minus.
            </p>
            <img
              src="/front-page-librarian-reading-a-book-1.png"
              className="home-content-img"
            ></img>
          </div>
        </div>
        <div className="home-btns">
          <button className="fake-btn">Contact Us</button>
        </div>
      </div>
    </>
  );
};
export default Home;
