import css from "./App.module.css";
// import NavBarSimple from "./components/NavBarSimple";
import Sidebar from "./components/Sidebar";
import NavBarForm from "./components/NavBarForm";
// import Content from "./components/Content";
// import ContentHooks from "./components/ContentHooks";
// import ContentApi from "./components/ContentApi";
import ContentApiHooks from "./components/ContentApiHooks";

function App() {
  return (
    <div className={css.App}>
      {/* Add your components here */}
      <NavBarForm />
      <Sidebar />
      {/* <Content /> */}
      {/* <ContentHooks /> */}
      {/* <ContentApi /> */}
      <ContentApiHooks />
    </div>
  );
}

export default App;