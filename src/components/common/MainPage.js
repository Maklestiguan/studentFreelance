import React, { useEffect } from 'react';
import { MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './commonStyles.css';
import mainPageJpg from '../../static/MainPage.jpg';
import supportPng from '../../static/customer-service.png';
import safetyPng from '../../static/shield.png';
import moneySavePng from '../../static/earn.png';
import customer1 from '../../static/1stCustomer.png';
import customer2 from '../../static/2ndCustomer.png';
import customer3 from '../../static/3rdCustomer.png';
import star from '../../static/Star.png';

const MainPage = props => {
  return (
      <div>
        <div style={{ margin: "50px 0px 0px 0px"}}>
          <div className="PromotionText box">
            <span className="flex-item-equal-half">Хвостов.net -
              <span style={{ "color": "black"}}> лучший сервис по поиску наставников по учёбе.<br></br><br></br></span>
              <span className="text-no-giving-up">С нами легко сдавать - но не сдаваться!<br></br></span>
              <MDBBtn className="close-dolgi-btn big-btn">Закрыть долги</MDBBtn>
            </span>
            <img className="flex-item-equal rounded mb-5" src={mainPageJpg} align="right" alt="Unable to load" height="500" width="750" />
          </div>
        </div>
        <div className="text-our-advantages">
          <span> Плюсы нашего сервиса</span>
        </div>
        <div className="box-advantages text-our-exact-advantages">
          <span className="flex-item-equal">
            <img src={supportPng} alt="Unable to load" height="77" width="77"/><br></br>
            Поддержка<br></br>
            <span className="text-our-exact-advantages-details">
              Команда профессионалов, которая всегда готова ответить на ваши вопросы
            </span>
          </span>
          <span className="flex-item-equal">
            <img src={safetyPng} alt="Unable to load" height="77" width="77"/><br></br>
            Защита Ваших данных<br></br>
            <span className="text-our-exact-advantages-details">
              Мы предлагаем вам абсолютно безопасный сервис, и надёжно защищаем все ваши данные от злоумышленников
            </span>
          </span>
          <span className="flex-item-equal">
            <img src={moneySavePng} alt="Unable to load" height="77" width="77"/><br></br>
            Низкие цены<br></br>
            <span className="text-our-exact-advantages-details">
              Минимальная цена ниже чем у конкурентов
            </span>
          </span>
        </div>
        <div className="text-our-advantages">
          <span> Отзывы довольных студентов </span>
        </div>
        <div className="box-reviews text-our-exact-advantages">
          <span className="flex-item-equal-border">
            <img src={customer1} alt="Unable to load" height="122" width="122"/><br></br>
            Петр Иванов<br></br>
            <span className="text-reviews">
              Нашел здесь лучшего <br></br> репетитора по физике, спасибо Хвостов.net<br></br>
            </span>
            <img className="pic-review" src={star} alt="Unable to load"/>
            <img className="pic-review" src={star} alt="Unable to load"/>
            <img className="pic-review" src={star} alt="Unable to load"/>
            <img className="pic-review" src={star} alt="Unable to load"/>
            <img className="pic-review" src={star} alt="Unable to load"/>
          </span>
          <span className="flex-item-equal-border">
            <img src={customer2} alt="Unable to load" height="122" width="122"/><br></br>
            Лев Чубайс<br></br>
            <span className="text-reviews">
              Быстро нашёл автора для моего диплома, защитился на 5 супер сервис!!!<br></br>
            </span>
            <img className="pic-review" src={star} alt="Unable to load"/>
            <img className="pic-review" src={star} alt="Unable to load"/>
            <img className="pic-review" src={star} alt="Unable to load"/>
            <img className="pic-review" src={star} alt="Unable to load"/>
            <img className="pic-review" src={star} alt="Unable to load"/>
          </span>
          <span className="flex-item-equal-border">
            <img src={customer3} alt="Unable to load" height="122" width="122"/><br></br>
            Анна Плющ<br></br>
            <span className="text-reviews">
              Огромный перечень выбора работ, и очень много наставников бомбический сайт!<br></br>
            </span>
            <img className="pic-review" src={star} alt="Unable to load"/>
            <img className="pic-review" src={star} alt="Unable to load"/>
            <img className="pic-review" src={star} alt="Unable to load"/>
            <img className="pic-review" src={star} alt="Unable to load"/>
            <img className="pic-review" src={star} alt="Unable to load"/>
          </span>
        </div>
      </div>
  )
};


export default MainPage;
