import React from "react";
import styles from "../../styles/banner.module.css";
import { Col, Container, Row } from "react-bootstrap";

const Banner = () => {
  return (
    <>
      <div className={styles.image}></div>
      <div className={styles.banner}>
        <Container className="text-white caladea-font">
          <Row>
            <Col lg={6}>
              <h1 className="display-2 mt-auto">
                Spraw aby życie miało smaczek...
              </h1>
            </Col>
          </Row>
          <Row>
            <Col lg={7}>
              <h3>
                Znasz to uczucie kiedy nie wiesz co zjeść? Może znowu nie
                kupiłeś wszystkiego w sklepie? Z nami pozbędziesz się tych
                problemów. Inspiruj się naszymi przepisami, planuj posiłki oraz
                twórz listy zakupów. Smacznego!
              </h3>
            </Col>
          </Row>
        </Container>
      </div>
    </>

    // <div className={styles.banner}>
    //   <Container className="text-white caladea-font">
    //     <Row>
    //       <Col lg={6}>
    //         <h1 className="display-2 mt-auto">
    //           Spraw aby życie miało smaczek...
    //         </h1>
    //       </Col>
    //     </Row>
    //     <Row>
    //       <Col lg={7}>
    //         <h3>
    //           Znasz to uczucie kiedy nie wiesz co zjeść? Może znowu nie kupiłeś
    //           wszystkiego w sklepie? Z nami pozbędziesz się tych problemów.
    //           Inspiruj się naszymi przepisami, planuj posiłki oraz twórz listy
    //           zakupów. Smacznego!
    //         </h3>
    //       </Col>
    //     </Row>
    //   </Container>
    // </div>
  );
};

export default Banner;
