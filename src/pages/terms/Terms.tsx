import React from 'react';
import {Theme, makeStyles} from '@material-ui/core/styles';
import BaseLayout from "../../components/BaseLayout";
import {Container} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Footer from "../../components/Footer";
import Grid from "@material-ui/core/Grid";
import TermsMenu from "../../components/menus/TermsMenu";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStylesForContents = makeStyles((theme: Theme) => ({
	root: {
		margin: theme.spacing(1),
	},
	termsTitle: {
		fontWeight: 'bold',
	},
	termsTitleLine: {
		height: '2.5px',
	},
	termsTitleText: {
		margin: '8px 0px',
	},
	termsSection: {
		margin: '24px 0 0 0',
	},
	sectionTitle: {
		fontWeight: 'bold',
	},
	sectionContents: {
		padding: '16px 0 0 20px',
	}
}));

const TermsContents: React.FC = () => {
	const classes = useStylesForContents();

	return (
		<div className={classes.root}>
			<div>
				<Typography variant='h5' component='h5' gutterBottom className={classes.termsTitle}>
					利用規約
				</Typography>
				<Divider className={classes.termsTitleLine}/>
				<div className={classes.termsTitleText}>
					<Typography variant='body1' gutterBottom>
						この利用規約（以下、「本規約」といいます。）は、WHITE CHASERS（以下、「本サービス」といいます）の利用条件を定めるものです。
						登録ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
					</Typography>
				</div>
			</div>

			<div>
				<div className={classes.termsSection}>
					<Typography variant='subtitle1' gutterBottom className={classes.sectionTitle}>
						第1条（適用）
					</Typography>
					<Divider/>
					<div>
						<ol>
							<li>
								<Typography variant='body1' gutterBottom>
									本規約は、本サービスの利用に関わる一切の関係に適用されるものとします。
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」といいます。）をすることがあります。
									これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り、
									個別規定の規定が優先されるものとします。
								</Typography>
							</li>
						</ol>
					</div>
				</div>

				<div className={classes.termsSection}>
					<Typography variant='subtitle1' gutterBottom className={classes.sectionTitle}>
						第2条（利用登録）
					</Typography>
					<Divider/>
					<div>
						<ol>
							<li>
								<Typography variant='body1' gutterBottom>
									本サービスにおいては、登録希望者が本規約に同意の上、本サービスの定める方法によって利用登録を申請し、
									本サービスがこれを承認することによって、利用登録が完了するものとします。
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									本サービスは、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、
									その理由については一切の開示義務を負わないものとします。
								</Typography>
								<div>
									<ol>
										<li>
											<Typography variant='body1' gutterBottom>
												利用登録の申請に際して虚偽の事項を届け出た場合
											</Typography>
										</li>
										<li>
											<Typography variant='body1' gutterBottom>
												本規約に違反したことがある者からの申請である場合
											</Typography>
										</li>
										<li>
											<Typography variant='body1' gutterBottom>
												その他、本サービスが利用登録を相当でないと判断した場合
											</Typography>
										</li>
									</ol>
								</div>
							</li>
						</ol>
					</div>
				</div>

				<div className={classes.termsSection}>
					<Typography variant='subtitle1' gutterBottom className={classes.sectionTitle}>
						第3条（ユーザーIDおよびパスワードの管理）
					</Typography>
					<Divider/>
					<div>
						<ol>
							<li>
								<Typography variant='body1' gutterBottom>
									ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、もしくは第三者と共用することはできません。
									本サービスは、ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には、
									そのユーザーIDを登録しているユーザー自身による利用とみなします。
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は、
									本サービスに故意又は重大な過失がある場合を除き、本サービスは一切の責任を負わないものとします。
								</Typography>
							</li>
						</ol>
					</div>
				</div>

				<div className={classes.termsSection}>
					<Typography variant='subtitle1' gutterBottom className={classes.sectionTitle}>
						第4条（利用料金および支払方法）
					</Typography>
					<Divider/>
					<div>
						<ol>
							<li>
								<Typography variant='body1' gutterBottom>
									ユーザーは、本サービスの有料部分の対価として、本サービスが別途定め、
									本サービスに表示する利用料金を、本サービスが指定する方法により支払うものとします。
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									ユーザーが利用料金の支払を遅滞した場合には、ユーザーは年14．6％の割合による遅延損害金を支払うものとします。
								</Typography>
							</li>
						</ol>
					</div>
				</div>

				<div className={classes.termsSection}>
					<Typography variant='subtitle1' gutterBottom className={classes.sectionTitle}>
						第5条（禁止事項）
					</Typography>
					<Divider/>
					<div className={classes.sectionContents}>
						<Typography variant='body1' gutterBottom>
							ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
						</Typography>
						<ol>
							<li>
								<Typography variant='body1' gutterBottom>
									法令または公序良俗に違反する行為
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									犯罪行為に関連する行為
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									本サービス、ほかのユーザー、またはその他第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									本サービスによって得られた情報を商業的に利用する行為
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									本サービスの運営を妨害するおそれのある行為
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									不正アクセスをし、またはこれを試みる行為
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									他のユーザーに関する個人情報等を収集または蓄積する行為
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									不正な目的を持って本サービスを利用する行為
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									本サービスの他のユーザーまたはその他の第三者に不利益、損害、不快感を与える行為
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									他のユーザーに成りすます行為
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									本サービスが許諾しない本サービス上での宣伝、広告、勧誘、または営業行為
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									面識のない異性との出会いを目的とした行為
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									本サービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									その他、本サービスが不適切と判断する行為
								</Typography>
							</li>
						</ol>
					</div>
				</div>

				<div className={classes.termsSection}>
					<Typography variant='subtitle1' gutterBottom className={classes.sectionTitle}>
						第6条（本サービスの提供の停止等）
					</Typography>
					<Divider/>
					<div>
						<ol>
							<li>
								<Typography variant='body1' gutterBottom>
									本サービスは、以下のいずれかの事由があると判断した場合、
									ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
								</Typography>
								<div>
									<ol>
										<li>
											<Typography variant='body1' gutterBottom>
												本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
											</Typography>
										</li>
										<li>
											<Typography variant='body1' gutterBottom>
												地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
											</Typography>
										</li>
										<li>
											<Typography variant='body1' gutterBottom>
												コンピュータまたは通信回線等が事故により停止した場合
											</Typography>
										</li>
										<li>
											<Typography variant='body1' gutterBottom>
												その他、本サービスが本サービスの提供が困難と判断した場合
											</Typography>
										</li>
									</ol>
								</div>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、
									一切の責任を負わないものとします。
								</Typography>
							</li>
						</ol>
					</div>
				</div>

				<div className={classes.termsSection}>
					<Typography variant='subtitle1' gutterBottom className={classes.sectionTitle}>
						第7条（利用制限および登録抹消）
					</Typography>
					<Divider/>
					<div>
						<ol>
							<li>
								<Typography variant='body1' gutterBottom>
									本サービスは、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して、
									本サービスの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。
								</Typography>
								<div>
									<ol>
										<li>
											<Typography variant='body1' gutterBottom>
												本規約のいずれかの条項に違反した場合
											</Typography>
										</li>
										<li>
											<Typography variant='body1' gutterBottom>
												登録事項に虚偽の事実があることが判明した場合
											</Typography>
										</li>
										<li>
											<Typography variant='body1' gutterBottom>
												料金等の支払債務の不履行があった場合
											</Typography>
										</li>
										<li>
											<Typography variant='body1' gutterBottom>
												本サービスからの連絡に対し、一定期間返答がない場合
											</Typography>
										</li>
										<li>
											<Typography variant='body1' gutterBottom>
												本サービスについて、最終の利用から一定期間利用がない場合
											</Typography>
										</li>
										<li>
											<Typography variant='body1' gutterBottom>
												その他、本サービスが本サービスの利用を適当でないと判断した場合
											</Typography>
										</li>
									</ol>
								</div>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									本サービスは、本条に基づき本サービスが行った行為によりユーザーに生じた損害について、一切の責任を負いません。
								</Typography>
							</li>
						</ol>
					</div>
				</div>

				<div className={classes.termsSection}>
					<Typography variant='subtitle1' gutterBottom className={classes.sectionTitle}>
						第8条（退会）
					</Typography>
					<Divider/>
					<div className={classes.sectionContents}>
						<Typography variant='body1' gutterBottom>
							ユーザーは、本サービスの定める退会手続により、本サービスから退会できるものとします。
						</Typography>
					</div>
				</div>

				<div className={classes.termsSection}>
					<Typography variant='subtitle1' gutterBottom className={classes.sectionTitle}>
						第9条（保証の否認および免責事項）
					</Typography>
					<Divider/>
					<div>
						<ol>
							<li>
								<Typography variant='body1' gutterBottom>
									本サービスは、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）
									がないことを明示的にも黙示的にも保証しておりません。
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									本サービスは、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。
									ただし、本サービスに関する本サービスとユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									前項ただし書に定める場合であっても、本サービスは、本サービスの過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち
									特別な事情から生じた損害（本サービスまたはユーザーが損害発生につき予見し、または予見し得た場合を含みます。）について一切の責任を負いません。
									また、本サービスの過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は、
									ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									本サービスは、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、
									連絡または紛争等について一切責任を負いません。
								</Typography>
							</li>
						</ol>
					</div>
				</div>

				<div className={classes.termsSection}>
					<Typography variant='subtitle1' gutterBottom className={classes.sectionTitle}>
						第10条（サービス内容の変更等）
					</Typography>
					<Divider/>
					<div className={classes.sectionContents}>
						<Typography variant='body1' gutterBottom>
							本サービスは、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、
							これによってユーザーに生じた損害について一切の責任を負いません。
						</Typography>
					</div>
				</div>

				<div className={classes.termsSection}>
					<Typography variant='subtitle1' gutterBottom className={classes.sectionTitle}>
						第11条（利用規約の変更）
					</Typography>
					<Divider/>
					<div className={classes.sectionContents}>
						<Typography variant='body1' gutterBottom>
							本サービスは、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。
							なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
						</Typography>
					</div>
				</div>

				<div className={classes.termsSection}>
					<Typography variant='subtitle1' gutterBottom className={classes.sectionTitle}>
						第12条（個人情報の取扱い）
					</Typography>
					<Divider/>
					<div className={classes.sectionContents}>
						<Typography variant='body1' gutterBottom>
							本サービスは、本サービスの利用によって取得する個人情報については、本サービス「プライバシーポリシー」に従い適切に取り扱うものとします。
						</Typography>
					</div>
				</div>

				<div className={classes.termsSection}>
					<Typography variant='subtitle1' gutterBottom className={classes.sectionTitle}>
						第13条（通知または連絡）
					</Typography>
					<Divider/>
					<div className={classes.sectionContents}>
						<Typography variant='body1' gutterBottom>
							ユーザーと本サービスとの間の通知または連絡は、本サービスの定める方法によって行うものとします。
							本サービスは,ユーザーから,本サービスが別途定める方式に従った変更届け出がない限り,現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い,
							これらは,発信時にユーザーへ到達したものとみなします。
						</Typography>
					</div>
				</div>

				<div className={classes.termsSection}>
					<Typography variant='subtitle1' gutterBottom className={classes.sectionTitle}>
						第14条（権利義務の譲渡の禁止）
					</Typography>
					<Divider/>
					<div className={classes.sectionContents}>
						<Typography variant='body1' gutterBottom>
							ユーザーは、本サービスの書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、
							または担保に供することはできません。
						</Typography>
					</div>
				</div>

				<div className={classes.termsSection}>
					<Typography variant='subtitle1' gutterBottom className={classes.sectionTitle}>
						第15条（準拠法・裁判管轄）
					</Typography>
					<Divider/>
					<div>
						<ol>
							<li>
								<Typography variant='body1' gutterBottom>
									本規約の解釈にあたっては、日本法を準拠法とします。
								</Typography>
							</li>
							<li>
								<Typography variant='body1' gutterBottom>
									本サービスに関して紛争が生じた場合には、本サービスの開発者の所在地を管轄する裁判所を専属的合意管轄とします。
								</Typography>
							</li>
						</ol>
					</div>
				</div>
			</div>
		</div>
	);
};

const useStyles = makeStyles(() => ({
	root: {
		margin: '16px 0',
	},
}));

const Terms: React.FC = () => {
	const classes = useStyles();

	return (
		<div>
			<BaseLayout>
				<>
					<Container maxWidth='lg'>
						<div className={classes.root}>
							<Grid container spacing={2}>
								<Grid item xs={12} lg={2}>
									<TermsMenu isTerms={true}/>
								</Grid>
								<Grid item xs={12} lg={10}>
									<Box my={2}>
										<TermsContents/>
									</Box>
								</Grid>
							</Grid>
						</div>
					</Container>
					<Footer/>
				</>
			</BaseLayout>
		</div>
	);
};

export default Terms;
