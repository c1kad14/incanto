import React from "react";

class Footer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div className="footer_wrapper">
				<div className="form subscribe-footer" id="subscribeFooter">
					<div className="subscribe_wrap-footer">
						<form id="email-subscriber-subscribe-form-footer" action="" method="post">
							<div className="pagePartTitle small mb25">Подписаться на рассылку</div>
							<div className="subscribe-footer input-block">
								<input placeholder="E-mail" className="form-input fs10" type="text" value="" name="EmailSubscriber[email]" id="EmailSubscriber_email" />
								<button className="blackbtt fs10 ls2" type="submit" name="yt0">Подписаться</button>
							</div>

							<div className="subscribe_sex_select">
								<input type="checkbox" id="cb_subFooter2" name="emailsubscriber_women" /><label htmlFor="cb_subFooter2"><span className="cb_classic"></span>Женщинам</label>
								<input type="checkbox" id="cb_subFooter1" name="emailsubscriber_men" /><label htmlFor="cb_subFooter1"><span className="cb_classic"></span>Мужчинам</label>
							</div>

							<input type="hidden" value="1" name="unsubscribe_field" id="unsubscribe_field" />
						</form>
					</div>

				</div>
        <ul className="footer_list">
					<li className="footer_list_item">
						<a className="footer_list_link" >Помощь</a>
					</li>
					<li className="footer_list_item">
						<a className="footer_list_link" >О компании</a>
					</li>
					<li className="footer_list_item">
						<a className="footer_list_link" >Контакты</a>
					</li>
					<li className="footer_list_item">
						<a id="footer_feedback" className="footer_list_link">Связаться с нами</a>
					</li>

					<li className="footer_list_item">
						<a className="footer_list_link" rel="nofollow">Facebook</a>
					</li>
				</ul>
				<div className="copyright_text">&copy; 2018 INCANTO</div>

			</div>;
	}
}

export default Footer;