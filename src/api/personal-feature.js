import request from '@/utils/request'

/** 一下格式都是参数名/数据类型/
 * indicate_name
 string
 (query)
 要关联的疾病

 material_name *
 string
 (query)
 素材名

 productName
 string
 (query)
 素材产品名

 richTextFormatContent
 string
 (query)
 疾病素材内容
 * @param data
 */
export function pAddKnowledge(data) {
  return request({
    url: '/personal/drug_knowledge',
    method: 'post',
    data
  })
}

/**
 * Name	Description
 primaryClassification *
 string
 (query)
 一级编号的id,此字段应该从primaryClassification表获取,如输入 个性特质的id为 PE

 secondaryPersonal *
 string
 (query)
 二级编号 id,此字段应该从secondaryPersonality表获取,比如输入 膳食敏感 的id为5

 indicate_name *
 string
 (query)
 要新的特性特征，此特性特征名会被添加到thirdLevelPersonality表中，在输入前，应先用/personal/find_person_interpretation 接口查询这个特性特征是否存在

 product_name *
 string
 (query)
 产品名 ,与product表关联

 suggest
 string
 (query)
 建议对策表里的建议对策字段 的内容

 introduction
 string
 (query)
 检测项目介绍 表里面的检测项目介绍 的内容

 gene
 string
 (query)
 基因名，若后台数据库不存在这个基因名，就自动创建,(前台显示时是否应该把后台存在的基因用下拉框列出来呢)

 personalityKnowlege
 string
 (query)
 相关联的知识库 id
 * @param data
 */
export function pAddPersoninterpretation(data) {
  return request({
    url: '/personal/add_person_interpretation',
    method: 'post',
    data
  })
}

/**
 * indicate_id *
 string
 (query)
 指标编号

 SNP
 string
 (query)
 SNP位点名，若后台数据库不存在这个位点，就自动创建 （是否应该 在选择或填入gene后，再此设置一个下拉框来选择或者填入新的SNP呢)

 gene
 string
 (query)
 基因名，若后台数据库不存在这个基因名，就自动创建,(前台显示时是否应该把后台存在的基因用下拉框列出来呢)

 genotype
 string
 (query)
 genotype,发送到后台的genotype 和 effect 的数目要一样 ,若其中一个为空请用空字符串替代

 effect
 string
 (query)
 genotype,发送到后台的genotype 和 effect 的数目要一样 ,若其中一个为空请用空字符串替代

 reference
 string
 (query)
 reference,参考文献 ,每行对应一份参考文献？需要讨论一下参考文献与每个解读指标之间的关系。现是一个参考文献输入框对应多行解读指标。
 * @param data
 */
export function pAddSnp(data) {
  return request({
    url: '/personal/add_snp',
    method: 'post',
    data
  })
}

/**
 * Name	Description
 indicate_id
 integer
 (query)
 检测指标的ID

 personal_knowelge_id
 integer
 (query)
 解读的知识库的id
 * @param data
 */
export function pChangerelate(data) {
  return request({
    url: '/personal/change_relate',
    method: 'post',
    data
  })
}

/**
 * Name	Description
 interpretation_id
 integer
 (query)
 指标解读结论的id
 * @param interpretation_id
 */
export function gDeleteinterpretation(interpretation_id) {
  return request({
    url: '/personal/delete_Interpretation',
    method: '',
    params: { interpretation_id }
  })
}

/**
 * indicate_id
 integer
 (query)
 指标的id
 * @param indicate_id
 */
export function gDeleteindicate(indicate_id) {
  return request({
    url: '/personal/delete_indicate',
    method: 'get',
    params: { indicate_id }
  })
}

/**
 * id *
 string
 (query)
 删除的素材id号
 * @param id
 */
export function pDeleteknowledge(id) {
  return request({
    url: '/personal/delete_knowledge',
    method: 'post',
    id
  })
}

/**
 * Name	Description
 id
 integer
 (query)
 需要修改的素材id

 richTextFormatContent
 string
 (query)
 要修改的素材内容

 indicate_name
 string
 (query)
 此素材关联到的指标名

 material_name
 string
 (query)
 素材名
 * @param qyery
 */
export function pEditKnowledge(qyery) {
  return request({
    url: '/personal/edit_knowledge',
    method: 'post',
    qyery
  })
}

/**
 * Name	Description
 indicate_id *
 string
 (query)
 指标编号

 indicate_name *
 string
 (query)
 指标名称

 primaryClassification *
 string
 (query)
 一级编号的id,此字段应该从primaryClassification表获取,如输入 个性特质的id为 PE

 secondaryPersonal *
 string
 (query)
 二级编号 id,此字段应该从secondaryPersonality表获取,比如输入 膳食敏感 的id为5

 product_name *
 string
 (query)
 产品名 ,与product表关联

 suggest
 string
 (query)
 建议对策表里的建议对策字段 的内容

 introduction
 string
 (query)
 检测项目介绍 表里面的检测项目介绍 的内容

 personalityKnowlege
 string
 (query)
 关联知识库id

 interpretation_id
 string
 (query)
 解读指标 interpretation_id 是从 PersonalityInterpretation 内获取的,解读指标有多行，每行是有SNP，Gene，genotype，effect四部分组成。传递都后台的每行都应该包含着四部分信息，若某部分（比如effect部分）为空，也应传递空字符串(即effect=""这样的形式)。

 SNP
 string
 (query)
 SNP位点名，若后台数据库不存在这个位点，就自动创建 （是否应该 在选择或填入gene后，再此设置一个下拉框来选择或者填入新的SNP呢)

 gene
 string
 (query)
 基因名，若后台数据库不存在这个基因名，就自动创建,(前台显示时是否应该把后台存在的基因用下拉框列出来呢)

 genotype
 string
 (query)
 genotype,发送到后台的genotype 和 effect 的数目要一样 ,若其中一个为空请用空字符串替代

 effect
 string
 (query)
 genotype,发送到后台的genotype 和 effect 的数目要一样 ,若其中一个为空请用空字符串替代

 reference
 string
 (query)
 reference,参考文献 ,每行对应一份参考文献？需要讨论一下参考文献与每个解读指标之间的关系。现是一个参考文献输入框对应多行解读指标。
 * @param data
 */
export function pEditpersioninterpretation(data) {
  return request({
    url: '/personal/edit_person_interpretation',
    method: 'post',
    data
  })
}

/**
 * Name	Description
 id
 integer
 (query)
 需要修改的素材id

 richTextFormatContent
 string
 (query)
 要修改的素材内容

 indicate_name
 string
 (query)
 此素材关联到的指标名

 material_name
 string
 (query)
 素材名
 * @param indicate_name
 */
export function gFindpersoninterpretation(indicate_name) {
  return request({
    url: '/personal/find_person_interpretation',
    method: 'get',
    params: { indicate_name }
  })
}

/**
 * Name	Description
 indicate_id
 integer
 (query)
 指标的id,若为空，则列出所有的知识库
 * @param indicate_id
 */
export function gIndicate2knowledge(indicate_id) {
  return request({
    url: '/personal/indicate_2_knowledge',
    method: 'get',
    params: { indicate_id }
  })
}

/**
 * Name	Description
 indicate_id
 integer
 (query)
 指标的id
 * @param indicate_id
 */
export function gListallinterpretation(indicate_id) {
  return request({
    url: '/personal/list_all_interpretation',
    method: 'get',
    params: { indicate_id }
  })
}

/**
 * page_size
 integer
 (query)
 每页显示数目

 page
 integer
 (query)
 要显示的页码
 * @param query
 */
export function gListallpersonal(query) {
  return request({
    url: '/personal/list_all_psersonal',
    method: 'get',
    params: query
  })
}

/**
 * Name	Description
 page_size
 integer
 (query)
 每页显示数目

 page
 integer
 (query)
 要显示的页码
 * @param query
 */
export function gListknowlwdge(query) {
  return request({
    url: '/personal/list_knowledge',
    method: 'get',
    params: { query }
  })
}

export function list_product(query) {
  return request({
    url: '/product/list_product',
    method: 'get',
    params: query
  })
}
