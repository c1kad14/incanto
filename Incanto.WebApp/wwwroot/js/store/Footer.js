import React from "react";

class Footer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div className="footer_wrapper">
			<div id="footer-banner">
			<img id="leftSidebar" src="/leftSidebarImage.png"/>
			<div id="subscribeFooter">
				<div className="subscribe_wrap_footer">
					<form id="email-subscriber-subscribe-form-footer" action="" method="post">
						<div className="pagePartTitle small mb25">
							<p>Будем на связи</p>
							<p>Вы хотите быть в курсе всех новинок или получать приоритетный доступ к распродаже?</p>
							</div>
						<div className="subscribe-footer">
								<input placeholder="Да! Мой e-mail..." className="form-input fs10" type="text" name="email-subscriber" id="subscriber_email" maxLength="50"/>
							<button className="blackbtt fs10 ls2" type="submit" name="subscribe">Подписаться</button>
						</div>

						<div className="subscribe_sex_select">
								<div><input type="checkbox" id="cb_subFooter2" name="emailsubscriber_women" value="forHer" /><span>Для нее</span></div>
								<div><input type="checkbox" id="cb_subFooter1" name="emailsubscriber_men" value="forHim" /><span>Для него</span></div>
							
						</div>
					</form>
				</div>

			</div>
			<img id="rightSidebar" src="/rightSidebarImage.png"/>
			</div>
			<div id="footer-bottom-container">
				<div className="footer-bottom-item">
						<ul>
							<li><a className="color-white" href="/">INCANTO</a></li>
							<li><a className="color-white" href="/help">Вопросы и ответы</a></li>
							<li><a className="color-white" href="/contacts">Контакты</a></li>
							<li><a className="color-white" href="/help">Обмен и возврат</a></li>
							<li><a className="color-white" href="/help">Оплата и доставка</a></li>
							<li><a className="color-white" href="/help">Сотрудничество</a></li>
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
							<a href="https://www.instagram.com/incantoclothes">
								<img id="instagram-footer" src="/instagram.png" /></a>
							<a href="https://www.facebook.com/incantoclothes">
								<img id="facebook-footer" src="/facebook.png" /></a>
						</li>
						<li>
							<img id="payment-footer" src="/payment.png" />
						</li>
					</ul>
				</div>
			</div>
		</div>;
	}
}

export default Footer;