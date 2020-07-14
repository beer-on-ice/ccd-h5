import { post, get } from "../request.js";
import urls from "./apilist.js";

const apis = {
  getRankInfo,
  getFundScale,
  getFundState,
  getIndusty,
  getCounselorInfo,
  previewShowSingleCompanyAdviser,
  getWorkExperiences,
  previewWorkExperiences,
  getAnalysis,
  getInfoByYear,
  getBrandShow,
  getInsBrandShow,
  getPreviewContent,
  getCompanyHolder,
  getEnterpriseAtlas,
  getReportById,
  previewShowSingleActivityInformation,
  getProtocolAndPolicy,
  eventBooking,
  appShowAppActivityInformation,
  appButtonIdentification,
  iCanFlay,
  investerAttentions,
  mainInfo,
  productList,
  getOpinionInfo,
  getHonestyInfo,
  showCompanyAdvisers,
  showCompanyAdvisersCount,
  showCompanyFeature,
  showCompanyAptitude,
  showCompanyHonor,
  showBranchOrganizations,
  showBranchOrganizationCount,
  getBrandIntroduction,
  pagingHomepageActivityInformation
};

// 产品数量排名信息接口
function getRankInfo(params) {
  return get(urls.getRankInfo, params);
}

// 顾问信息
function getCounselorInfo(params) {
  return get(urls.getCounselorInfo, params);
}

// 还是tm的顾问信息
function previewShowSingleCompanyAdviser(params) {
  return get(urls.previewShowSingleCompanyAdviser, params);
}

function getFundScale(params) {
  return get(urls.getFundScale, params);
}

// 运行状态
function getFundState(params) {
  return get(urls.getFundState, params);
}

// 投向行业
function getIndusty(params) {
  return get(urls.getIndusty, params);
}

// 顾问信息 - 工作经历
function getWorkExperiences(params) {
  return get(urls.getWorkExperiences, params);
}

function previewWorkExperiences(params) {
  return get(urls.previewWorkExperiences, params);
}

function getPreviewContent(params) {
  return get(urls.getPreviewContent, params);
}

// 类型分析
function getAnalysis(params) {
  return get(urls.getAnalysis, params);
}

// 发行时间
function getInfoByYear(params) {
  return get(urls.getInfoByYear, params);
}

// 项目品牌
function getBrandShow(params) {
  return get(urls.getBrandShow, params);
}

// 企业品牌
function getInsBrandShow(params) {
  return get(urls.getInsBrandShow, params);
}

// 股权信息
function getCompanyHolder(params) {
  return get(urls.getCompanyHolder, params);
}

function getEnterpriseAtlas(params) {
  return get(urls.EnterpriseAtlas, params);
}

function getReportById(params) {
  return get(urls.getReportById, params);
}

// 活动单笔展示
function previewShowSingleActivityInformation(params) {
  return get(urls.previewShowSingleActivityInformation, params);
}
function appShowAppActivityInformation(params) {
  return get(urls.appShowAppActivityInformation, params);
}

function getProtocolAndPolicy(params) {
  return get(urls.getProtocolAndPolicy, params);
}

function eventBooking(params) {
  return post(urls.eventBooking, params);
}

function appButtonIdentification(params) {
  return post(urls.appButtonIdentification, params);
}

function iCanFlay(params) {
  return get(urls.iCanFlay, params);
}

// 投资者关注
function investerAttentions(params) {
  return get(urls.investerAttentions, params);
}

function mainInfo(params) {
  return get(urls.mainInfo, params);
}

function productList(params) {
  return get(urls.productList, params);
}

function getOpinionInfo(params) {
  return get(urls.getOpinionInfo, params);
}

function getHonestyInfo(params) {
  return get(urls.honestyInfo, params);
}

function showCompanyAdvisers(params) {
  return get(urls.showCompanyAdvisers, params);
}

function showCompanyAdvisersCount(params) {
  return get(urls.showCompanyAdvisersCount, params);
}

function showCompanyFeature(params) {
  return get(urls.showCompanyFeature, params);
}

function showCompanyAptitude(params) {
  return get(urls.showCompanyAptitude, params);
}

function showCompanyHonor(params) {
  return get(urls.showCompanyHonor, params);
}

function showBranchOrganizations(params) {
  return get(urls.showBranchOrganizations, params);
}

function showBranchOrganizationCount(params) {
  return get(urls.showBranchOrganizationCount, params);
}

function getBrandIntroduction(params) {
  return get(urls.getBrandIntroduction, params);
}

function pagingHomepageActivityInformation(params) {
  return get(urls.pagingHomepageActivityInformation, params);
}

export default apis;
