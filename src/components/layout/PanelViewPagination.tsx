import { MdCancelPresentation, MdEditSquare } from "react-icons/md";
import styles from "./PanelView.module.css";
import { IoIosAddCircleOutline } from "react-icons/io";

export const PanelViewPagination = (
    {pagination, txtButton, handleOnChange, handleOnChangeNav, children, enableAdd, navEnable, handleOnChangeAdd}: 
    {pagination: string[], txtButton: any; handleOnChange: any; handleOnChangeNav: any; children: JSX.Element; enableAdd: boolean; navEnable: String, handleOnChangeAdd: any}) => {
  return (
    <div className={`${styles.panel_header}`}>
      <div className={`card bg-info text-white`}>
        <div className={`${styles.panel_boby} card-header`}>
          <ul className="nav nav-pills card-header-pills">
              {pagination.map((item) => (
                  <li className="nav-item">
                    <a className={`nav-link ${navEnable === item ? 'active' : ''}`} aria-current="true" onClick={() => handleOnChangeNav(item)}>{item}</a>
                  </li>
              ))}
          </ul>
          <>
            <div>
                {(() => {
                  if(enableAdd){
                    return <IoIosAddCircleOutline onClick={handleOnChangeAdd} size={40} />;
                  }
                })()}
                {(() => {
                  if (!txtButton) {
                    return null;
                  } else {
                    if (txtButton === "Editar") {
                      return <MdEditSquare onClick={handleOnChange} size={40}/>;
                    } else {
                      return <MdCancelPresentation onClick={handleOnChange} size={40}/>;
                    }
                  }
                })()}
            </div>
          </>
        </div>
        <div className="card bg-light text-dark">
          <div className={`${styles.padding} row`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
