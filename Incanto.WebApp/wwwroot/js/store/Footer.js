import React from "react";

class Footer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div className="footer_wrapper">
			<img id="leftSidebar" src="/leftSidebarImage.png"/>
			<div id="subscribeFooter">
				<div className="subscribe_wrap_footer">
					<form id="email-subscriber-subscribe-form-footer" action="" method="post">
						<div className="pagePartTitle small mb25">
							<p>Будем на связи</p>
							<p>Вы хотите быть в курсе всех новинок или получать приоритетный доступ к распродаже?</p>
							</div>
						<div className="subscribe-footer">
							<input placeholder="Да! Мой e-mail..." className="form-input fs10" type="text" name="EmailSubscriber[email]" id="subscriber_email" />
							<button className="blackbtt fs10 ls2" type="submit" name="yt0">Подписаться</button>
						</div>

						<div className="subscribe_sex_select">
							<input type="checkbox" id="cb_subFooter2" name="emailsubscriber_women" /><label htmlFor="cb_subFooter2"><span className="cb_classic"></span>Для нее</label>
							<input type="checkbox" id="cb_subFooter1" name="emailsubscriber_men" /><label htmlFor="cb_subFooter1"><span className="cb_classic"></span>Для него</label>
						</div>

						<input type="hidden" value="1" name="unsubscribe_field" id="unsubscribe_field" />
					</form>
				</div>

			</div>
			<img id="rightSidebar" src="/rightSidebarImage.png"/>
			<div id="footer-bottom-container">
				<div className="footer-bottom-item">
						<ul>
							<li><a className="color-white" href="/">INCANTO</a></li>
							<li><a className="color-white" href="/">Вопросы и ответы</a></li>
							<li><a className="color-white" href="/">Контакты</a></li>
							<li><a className="color-white" href="/">Обмен и возврат</a></li>
							<li><a className="color-white" href="/">Оплата и доставка</a></li>
							<li><a className="color-white" href="/">Сотрудничество</a></li>
						</ul>
					</div>
				<div className="footer-bottom-item">
					<ul>
						<li><p className="color-white">НАШИ КОНТАКТЫ</p></li>
						<li><p className="color-white">Украина г. Ровно</p></li>
						<li><p className="color-white">ул. Мицкевича 3</p></li>
						<li><p className="color-white">Телефон:</p></li>
						<li><p className="color-white">0362-06-06-11</p></li>
						<li><p className="color-white">пн.-пт. 10:00-19:00</p></li>
						<li><p className="color-white">сб. 10:00-17:00</p></li>
						<li><p className="color-white">вс. 10:00-18:00</p></li>
					</ul>
				</div>
				<div className="footer-bottom-item">
					<ul>
						<li><p className="color-white">СОЦИАЛЬНЫЕ СЕТИ</p></li>
						<li>
							<a style={{ marginRight: "25px" }} href="https://www.instagram.com/incantoclothes"><img src="/instagram.png" /></a>
							<a style={{ marginRight: "25px" }} href="https://www.facebook.com/incantoclothes"><img src="/facebook.png" /></a>
						</li>
						<li><img src="/payment.png"/></li>
						
					</ul>
				</div>
			</div>
		</div>;
	}
}

export default Footer;