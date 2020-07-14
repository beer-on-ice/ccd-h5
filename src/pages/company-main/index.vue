<template>
	<div class="company-main">
		<div class="banner"
			:style="{
        backgroundImage: basicInfo.backUrl
      }"></div>
		<div class="main">
			<section class="main-header-part padding-24"
				@click="goRelatePage">
				<div class="title flex-s-b">
					<div>
						<h2>{{ basicInfo.fullName }}</h2>
						<div class="info">
							<p>
								舆情{{ basicInfo.infoCount }}条/{{ basicInfo.establishDura }}
							</p>
							<p>{{ basicInfo.type | companyTypeFilter }}</p>
						</div>
					</div>
					<div>
						<img v-if="basicInfo.logoUrl"
							:src="basicInfo.logoUrl"
							alt="logo" />
						<p class="sliceName"
							v-else>{{ basicInfo.sliceName }}</p>
					</div>
				</div>
				<!-- <div class="rater flex-s-s">
          <rater :score="basicInfo.score" :disabled="true"></rater>
          <p>
            <span>{{ basicInfo.score }}</span>
            <span>评分</span>
          </p>
        </div> -->
				<div class="location bottom-border flex-s-b">
					<span class="site word"><i class="iconfont iconlocation"></i>{{ basicInfo.address }}</span>
					<span class="earth">
						<i class="iconfont iconcc-earth-o"></i>
						<i class="iconfont iconphone"></i>
					</span>
				</div>
				<div class="integrity bottom-border flex-s-b"
					v-if="honestyInfo.length">
					<p>
						<span>诚信信息</span>
						<span class="word">{{ honestyInfo[0].value }}</span>
					</p>
					<i class="iconfont iconright1"></i>
				</div>
				<ul class="info-tab bottom-border flex-s-b">
					<li v-for="item in infoTab"
						:key="item.id">
						<img :src="item.logo"
							alt="logo" />
						<h3>{{ item.title }}</h3>
					</li>
				</ul>
				<div class="chart flex-s-a">
					<p>
						<i class="iconfont iconzhishitupu"></i>
						企业图谱
					</p>
					<p>
						<i class="iconfont iconzuzhijiegou"></i>
						股权结构图
					</p>
				</div>
			</section>
			<div class="divider"></div>
			<section class="main-product-part padding-24"
				v-if="productInfo.list.length"
				@click="goRelatePage">
				<div class="subTitle flex-s-b">
					<h3>
						产品信息 <span> / {{ productInfo.total }}</span>
					</h3>
					<p>
						<span>更多</span>
						<i class="iconfont iconright1"></i>
					</p>
				</div>
				<ul>
					<li class="word"
						v-for="item in productInfo.list"
						:key="item.id">
						{{ item.fullName }}
					</li>
				</ul>
				<div class="analyze flex-c-c">
					<i class="iconfont iconzhuzhuangtu"></i>
					<span>产品分析</span>
				</div>
			</section>
			<div class="divider"
				v-if="productInfo.list.length"></div>
			<section v-if="cousultantCount"
				class="main-consultant-part padding-24">
				<div class="subTitle flex-s-b"
					@click="goRelatePage">
					<h3>
						金牌顾问<span> / {{ cousultantCount }}</span>
					</h3>
					<p>
						<span>更多</span>
						<i class="iconfont iconright1"></i>
					</p>
				</div>
				<div class="slide">
					<ul class="flex-s-s">
						<li v-for="item in consultantInfo"
							:key="item.id"
							@click="goToConsultant(item)">
							<img :src="item.showHeadUrl"
								alt="顾问头像" />
							<div>
								<p>{{ item.adviserName }}</p>
								<p>从业{{ handleYear(item.yearOfEmployment) }}年</p>
							</div>
						</li>
					</ul>
				</div>
			</section>
			<div v-if="cousultantCount"
				class="divider"></div>
			<section v-if="serviceInfo.length"
				class="main-service-part padding-24"
				@click="goRelatePage">
				<div class="subTitle flex-s-b">
					<h3>特色服务</h3>
				</div>
				<ul class="flex-s-b">
					<li v-for="item in serviceInfo"
						:key="item.id">
						<i class="iconfont icongou"></i> <span>{{ item }}</span>
					</li>
				</ul>
			</section>
			<div v-if="serviceInfo.length"
				class="divider"></div>
			<section v-if="certInfo.length"
				class="main-cert-part padding-24"
				@click="goRelatePage">
				<div class="subTitle flex-s-b">
					<h3>机构资质</h3>
				</div>
				<ul>
					<li class="flex-s-b"
						v-for="item in certInfo.slice(0, 3)"
						:key="item.id">
						<span>{{ item.aptitudeName }}</span>
						<span>更多<i class="iconfont iconright1"></i></span>
					</li>
				</ul>
				<p class="tip"
					v-if="certInfo.length > 2">
					更多{{ certInfo.length }}个证书<i class="iconfont icond-down"></i>
				</p>
			</section>
			<div v-if="certInfo.length"
				class="divider"></div>
			<section v-if="honorInfo.length"
				class="main-honor-part padding-24"
				@click="goRelatePage">
				<div class="subTitle flex-s-b">
					<h3>获得荣誉</h3>
				</div>
				<ul>
					<li class="flex-s-b"
						v-for="item in honorInfo.slice(0, 3)"
						:key="item.id">
						<span>{{ item.honorName }}</span>
						<span>更多<i class="iconfont iconright1"></i></span>
					</li>
				</ul>
				<p class="tip"
					v-if="honorInfo.length > 2">
					更多{{ honorInfo.length }}个荣誉<i class="iconfont icond-down"></i>
				</p>
			</section>
			<div v-if="honorInfo.length"
				class="divider"></div>
			<section v-if="branchesInfo.length"
				class="main-branch-part padding-24"
				@click="goRelatePage">
				<div class="subTitle flex-s-b">
					<h3>
						其他分支<span> / {{ branchesCount }}</span>
					</h3>
					<p>
						<span>更多</span>
						<i class="iconfont iconright1"></i>
					</p>
				</div>
				<ul>
					<li class="flex-s-s"
						v-for="item in branchesInfo"
						:key="item.companyUrl">
						<img :src="item.organizationLogo"
							alt="" />
						<div>
							<h4>{{ item.organizationName }}</h4>
							<p>
								<i class="iconfont iconlocation"></i><span>{{ item.detailedArea }}</span>
							</p>
							<p>
								<i class="iconfont iconphone"></i><span>{{ item.phone }}</span>
							</p>
							<p>
								<i class="iconfont iconchuanzhen"></i><span>{{ item.faxNum }}</span>
							</p>
						</div>
					</li>
				</ul>
			</section>
			<div v-if="branchesInfo.length"
				class="divider"></div>
			<section class="main-brand-part padding-24"
				v-if="brandIntroduction.description"
				@click="goRelatePage">
				<div class="subTitle flex-s-b">
					<h3>品牌介绍</h3>
					<p>
						<span>大事记</span>
						<i class="iconfont iconright1"></i>
					</p>
				</div>
				<p class="desc">
					{{ brandIntroduction.description }}
				</p>
			</section>
			<div v-if="brandIntroduction.description"
				class="divider"></div>
			<section v-if="activityInfo.list.length"
				class="main-activity-part padding-24">
				<div class="subTitle flex-s-b">
					<h3>精彩活动</h3>
					<p>
						<span>更多</span>
						<i class="iconfont iconright1"></i>
					</p>
				</div>
				<div class="slide">
					<ul class="flex-s-s">
						<li v-for="item in activityInfo.list"
							:key="item.id"
							@click="goToActivity(item)">
							<img :src="item.titlePic"
								alt="活动图" />
							<div>
								<p class="word">{{ item.activityName }}</p>
								<p>
									<span>{{ item.activityArea }}</span> ·
									<span>{{ item.activityTime }}</span>至<span>{{ item.activityClosingTime }}</span>
								</p>
							</div>
						</li>
					</ul>
				</div>
			</section>
			<div class="divider"
				v-if="brandIntroduction.description"></div>
			<section v-if="investInfo.length"
				class="main-investor-part padding-24"
				@click="goRelatePage">
				<h3>投资者关注</h3>
				<ul>
					<li v-for="item in investInfo"
						:key="item.id">
						<section class="flex-s-s">
							<img v-if="item.logoUrl"
								:src="item.logoUrl"
								alt="公司Logo" />
							<img v-else
								src="./img/defaultCompany.png"
								alt="公司Logo" />
							<div class="right">
								<p class="title">{{ item.fullName }}</p>
								<div class="info flex-s-b">
									<!-- <p class="star flex-s-s">
                    <rater :score="item.score" :disabled="true"></rater>
                    <span>{{ item.score }}</span>
                  </p> -->
									<p class="count">
										<span>舆情{{ item.infoCount }}条</span> <span>|</span><span>{{ item.establishDura }}</span>
									</p>
								</div>
								<div class="podi flex-s-b">
									<span>{{ item.institutionType }}</span>
									<!-- <span>{{ item.distance }}</span> -->
								</div>
							</div>
						</section>
						<div class="tip word"
							v-if="item.tip">
							{{ item.abnormal }} {{ item.dishonesty }} {{ item.otheHonesty }}
							{{ item.outOfContact }}
						</div>
					</li>
				</ul>
			</section>
			<div class="divider"
				v-if="investInfo.length"></div>
			<section v-if="opionInfo.list.length"
				class="main-opion-part padding-24">
				<h3>舆情资讯</h3>
				<ul>
					<li v-for="item in opionInfo.list"
						:key="item.id"
						@click="goToNews(item)">
						<div class="title">{{ item.title }}</div>
						<p>
							<span>{{ item.sourceForm }}</span>
							<span>{{ item.releaseDate }}</span>
						</p>
						<div class="flex-s-s"
							v-if="item.referWords.length">
							<span>提到</span>
							<div class="at">
								{{ item.referWords.join(" ") }}
							</div>
						</div>
					</li>
				</ul>
			</section>
		</div>
		<down-mask ref="downMask"></down-mask>
	</div>
</template>

<script>
// import Rater from "./../../components/rater/";
import DownMask from './../../components/downMask/'
import apis from '../../api/common'
import jumpInfoMixin from '../../mixins/jumpInfoMixin' // 引入mixin文件

const infoTab = [
	{
		id: 1,
		logo: require('./img/infotab1.png'),
		title: '工商信息'
	},
	{
		id: 2,
		logo: require('./img/infotab5.png'),
		title: '私募管理人'
	},
	{
		id: 3,
		logo: require('./img/infotab2.png'),
		title: '风险信息'
	},
	{
		id: 4,
		logo: require('./img/infotab3.png'),
		title: '历史变更'
	},
	{
		id: 5,
		logo: require('./img/infotab4.png'),
		title: '对外投资'
	}
]
export default {
	mixins: [jumpInfoMixin],
	components: {
		// Rater
		DownMask
	},
	data() {
		return {
			id: '',
			infoTab,
			score: 3,
			basicInfo: {},
			productInfo: {},
			investInfo: [],
			opionInfo: [],
			serviceInfo: [],
			honestyInfo: [],
			certInfo: [],
			honorInfo: [],
			branchesCount: 0,
			brandIntroduction: '',
			branchesInfo: [],
			cousultantCount: 0,
			consultantInfo: [],
			activityInfo: {},
			isShare: false
		}
	},
	created() {
		const {
			$route: {
				params: { id },
				query: { share }
			}
		} = this
		this.id = id
		this.isShare = Number(share)
		this.initInfo()
	},
	mounted() {
		if (this.isShare) this.generateShare()
	},
	methods: {
		async initInfo() {
			const {
				getMainInfo,
				getInvestAttention,
				getProductList,
				getOpinionInfo,
				getHonestyInfo,
				getShowCompanyAdvisersCount,
				getShowCompanyAdvisers,
				getShowCompanyFeature,
				getShowCompanyAptitude,
				getShowCompanyHonor,
				getBrandIntroduction,
				getPagingHomepageActivityInformation,
				getShowBranchOrganizations,
				getShowBranchOrganizationsCount
			} = this
			this.basicInfo = await getMainInfo()
			this.investInfo = await getInvestAttention()
			this.productInfo = await getProductList()
			this.opionInfo = await getOpinionInfo()
			this.honestyInfo = await getHonestyInfo()
			this.cousultantCount = await getShowCompanyAdvisersCount()
			this.consultantInfo = await getShowCompanyAdvisers()
			this.serviceInfo = await getShowCompanyFeature()
			this.certInfo = await getShowCompanyAptitude()
			this.honorInfo = await getShowCompanyHonor()
			this.brandIntroduction = await getBrandIntroduction()
			this.activityInfo = await getPagingHomepageActivityInformation()
			this.branchesInfo = await getShowBranchOrganizations()
			this.branchesCount = await getShowBranchOrganizationsCount()
		},

		async getMainInfo() {
			try {
				const res = await apis.mainInfo({ id: this.id })
				document.title = res.data.fullName
				let tmpRes = { ...res.data }
				tmpRes.backUrl =
					tmpRes.backgroundUrl !== ''
						? `url(${tmpRes.backgroundUrl})`
						: `url(${require('./img/bg.png')})`
				tmpRes.establishDura = this.handleEstabYear(res.data.establishment)
				tmpRes.sliceName = tmpRes.logoUrl ? '' : tmpRes.fullName.slice(0, 4)
				if (
					tmpRes.type === 2 ||
					tmpRes.type === 4 ||
					tmpRes.type === 5 ||
					tmpRes.type === 8
				) {
					this.infoTab = this.infoTab.filter(item => item.id !== 2)
				}
				return tmpRes
			} catch (err) {
				console.error(err)
			}
		},

		async getHonestyInfo() {
			try {
				const res = await apis.getHonestyInfo({
					administratorId: this.basicInfo.administratorId
				})
				return res.data
			} catch (err) {
				console.error(err)
			}
		},

		async getProductList() {
			try {
				const res = await apis.productList({
					start: 0,
					size: 3,
					company: this.basicInfo.administratorId,
					type: this.basicInfo.type,
					order: 0,
					property: 0,
					serviceType: 0,
					status: 0
				})
				if (res.data instanceof Array) {
					return { total: 0, list: [] }
				}
				return res.data
			} catch (err) {
				console.error(err)
			}
		},

		async getShowCompanyAdvisers() {
			try {
				const res = await apis.showCompanyAdvisers({
					companyUrl: this.id
				})
				return res.data
			} catch (err) {
				console.error(err)
			}
		},

		async getShowCompanyAdvisersCount() {
			try {
				const res = await apis.showCompanyAdvisersCount({
					companyUrl: this.id
				})
				return res.data
			} catch (err) {
				console.error(err)
			}
		},

		async getShowCompanyFeature() {
			try {
				const res = await apis.showCompanyFeature({
					companyUrl: this.id
				})
				let tmpRes = res.data
				if (tmpRes.characteristicService) {
					tmpRes = tmpRes.characteristicService.split(';')
				}
				return tmpRes
			} catch (err) {
				console.error(err)
			}
		},

		async getBrandIntroduction() {
			if (this.basicInfo.insId === '') return ''
			try {
				const res = await apis.getBrandIntroduction({
					insId: this.basicInfo.insId
				})
				return res.data
			} catch (err) {
				console.error(err)
			}
		},

		async getPagingHomepageActivityInformation() {
			try {
				const res = await apis.pagingHomepageActivityInformation({
					startPage: 1,
					pageSize: 20,
					companyUrl: this.id
				})
				let tmpArr = [],
					tmpRes = {}
				tmpArr = res.data.list.map(item => {
					let titlePic = item.titlePic ? item.titlePic.split(';')[0] : ''
					return { ...item, titlePic }
				})
				tmpRes = { ...res.data, list: tmpArr }
				return tmpRes
			} catch (err) {
				console.error(err)
			}
		},

		async getShowCompanyAptitude() {
			try {
				const res = await apis.showCompanyAptitude({
					companyUrl: this.id
				})
				return res.data
			} catch (err) {
				console.error(err)
			}
		},

		async getShowCompanyHonor() {
			try {
				const res = await apis.showCompanyHonor({
					companyUrl: this.id
				})
				return res.data
			} catch (err) {
				console.error(err)
			}
		},

		async getShowBranchOrganizations() {
			try {
				const res = await apis.showBranchOrganizations({
					companyUrl: this.id
				})
				return res.data
			} catch (err) {
				console.error(err)
			}
		},

		async getShowBranchOrganizationsCount() {
			try {
				const res = await apis.showBranchOrganizationCount({
					companyUrl: this.id
				})
				return res.data
			} catch (err) {
				console.error(err)
			}
		},

		async getOpinionInfo() {
			try {
				const res = await apis.getOpinionInfo({
					startPage: 0,
					pageSize: 20,
					type: 3,
					administratorId: this.basicInfo.administratorId
				})
				return res.data
			} catch (err) {
				console.error(err)
			}
		},

		async getInvestAttention() {
			try {
				const res = await apis.investerAttentions({
					type: this.basicInfo.type
				})
				let tmpRes = [...res.data]
				tmpRes.map(item => {
					item.establishDura = this.handleEstabYear(item.establishment)
				})
				return tmpRes
			} catch (err) {
				console.error(err)
			}
		},
		// 从业时间处理
		handleYear(regTime) {
			let dateStart = new Date(regTime)
			let dateEnd = new Date(new Date().getTime())
			let difValue = (dateEnd - dateStart) / (1000 * 60 * 60 * 24)
			if (difValue < 365) {
				return '不足一年'
			} else if (difValue > 365) {
				let num = Math.floor(difValue / 365)
				return num
			} else {
				this.info.jobRange = '从业时间有误'
			}
		},
		handleEstabYear(regTime) {
			let dateStart = new Date(regTime)
			let dateEnd = new Date(new Date().getTime())
			let difValue = (dateEnd - dateStart) / (1000 * 60 * 60 * 24)
			if (difValue < 365) {
				return '成立不足一年'
			} else if (difValue > 365) {
				let num = Math.floor(difValue / 365)
				return `成立${num}年`
			} else {
				this.info.jobRange = '从业时间有误'
			}
		},
		goToConsultant({ id }) {
			this.$router.push({
				name: 'counselor',
				params: { id },
				query: { share: 1, type: 'app' }
			})
		},
		goToActivity({ id }) {
			this.$router.push({
				name: 'activity',
				params: { id },
				query: { share: 1, type: 'app' }
			})
		},
		goToNews({ id }) {
			window.location.href = `https://testinfo.aifound.cn/newDetail.html?id=${id}`
		},
		goRelatePage() {
			if (this.isShare) this.$refs.downMask.show()
			this.gengerateJumpInfo()
		}
	},
	filters: {
		honestyInfoFilter(type) {
			switch (type) {
				case 'outOfContact':
					return '失联机构'
				case 'abnormal':
					return '异常机构'
				case 'regulatoryMeasures':
					return '监管措施'
				case 'falseSubmit':
					return '虚假填报'
				case 'importantOmissions':
					return '重大遗漏'
				case 'violation':
					return '违反规定'
				case 'dishonesty':
					return '不诚信记录'
				case 'otheHonesty':
					return '其他诚信记录'
			}
		},
		companyTypeFilter(val) {
			switch (Number(val)) {
				case 1:
					return '基金'
				case 2:
					return '信托'
				case 3:
					return '基金且信托'
				case 4:
					return '银行'
				case 5:
					return '保险'
				case 6:
					return '基金且银行'
				case 7:
					return '基金且保险'
				case 8:
					return '证券'
				case 9:
					return '基金且证券'
				default:
					return '暂无'
			}
		}
	}
}
</script>

<style lang="stylus" scoped src="./index.styl"></style>
