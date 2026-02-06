import{ak as F,aS as L,az as z,a7 as W,ag as O,M as C,h as Q,L as x,A as j,x as J,C as Y,J as K}from"./3iSoGi4ic-DV-GuiCp.js";import{H as m}from"./3iSoGi4ic-nJzNoieu.js";import{M as Z}from"./3iSoGi4ic-BDF7xMl0.js";import{M as G}from"./3iSoGi4ic--zoJC9Uy.js";import{b as X,a as p,ab as ee,c as _,z as te,f as k,i as q,h as s,p as a,B as c,D as i,E as r,t as I,R as le,C as se}from"./3iSoGi4ic-D0mTJ0Mu.js";import"./3iSoGi4ic-B1GPmOGN.js";import"./3iSoGi4ic-D98_HDRS.js";import"./3iSoGi4ic-C0O4p9AH.js";import"./3iSoGi4ic-Ddz4upM5.js";import"./3iSoGi4ic-ke9ZaMpT.js";import"./3iSoGi4ic-DAn693fE.js";import"https://esm.sh/shiki@3.19.0/langs";import"https://esm.sh/shiki@3.19.0/themes";const ae={class:"_spacer",style:{"--MI_SPACER-w":"700px"}},ie={class:"_gaps"},re={class:"_spacer"},oe={class:"_buttons"},ke=X({__name:"flash-edit",props:{id:{}},async setup(E){let f,U;const S=`/// @ ${m}

var name = ""

Ui:render([
	Ui:C:textInput({
		label: "Your name"
		onInput: @(v) { name = v }
	})
	Ui:C:button({
		text: "Hello"
		onClick: @() {
			Mk:dialog(null, \`Hello, {name}!\`)
		}
	})
])
`,w=`/// @ ${m}
// ユーザーごとに日替わりのおみくじのプリセット

// 選択肢
let choices = [
	"ｷﾞｶﾞ吉"
	"大吉"
	"吉"
	"中吉"
	"小吉"
	"末吉"
	"凶"
	"大凶"
]

// シードが「PlayID+ユーザーID+今日の日付」である乱数生成器を用意
let random = Math:gen_rng(\`{THIS_ID}{USER_ID}{Date:year()}{Date:month()}{Date:day()}\`)

// ランダムに選択肢を選ぶ
let chosen = choices[random(0, (choices.len - 1))]

// 結果のテキスト
let result = \`今日のあなたの運勢は **{chosen}** です。\`

// UIを表示
Ui:render([
	Ui:C:container({
		align: 'center'
		children: [
			Ui:C:mfm({ text: result })
			Ui:C:postFormButton({
				text: "投稿する"
				rounded: true
				primary: true
				form: {
					text: \`{result}{Str:lf}{THIS_URL}\`
				}
			})
		]
	})
])
`,T=`/// @ ${m}
// 巻き戻し可能な文字シャッフルのプリセット

let string = "ペペロンチーノ"
let length = string.len

// 過去の結果を保存しておくやつ
var results = []

// どれだけ巻き戻しているか
var cursor = 0

@main() {
	if (cursor != 0) {
		results = results.slice(0, (cursor + 1))
		cursor = 0
	}

	let chars = []
	for (let i, length) {
		let r = Math:rnd(0, (length - 1))
		chars.push(string.pick(r))
	}
	let result = chars.join("")

	results.push(result)

	// UIを表示
	render(result)
}

@back() {
	cursor = cursor + 1
	let result = results[results.len - (cursor + 1)]
	render(result)
}

@forward() {
	cursor = cursor - 1
	let result = results[results.len - (cursor + 1)]
	render(result)
}

@render(result) {
	Ui:render([
		Ui:C:container({
			align: 'center'
			children: [
				Ui:C:mfm({ text: result })
				Ui:C:buttons({
					buttons: [{
						text: "←"
						disabled: !(results.len > 1 && (results.len - cursor) > 1)
						onClick: back
					}, {
						text: "→"
						disabled: !(results.len > 1 && cursor > 0)
						onClick: forward
					}, {
						text: "引き直す"
						onClick: main
					}]
				})
				Ui:C:postFormButton({
					text: "投稿する"
					rounded: true
					primary: true
					form: {
						text: \`{result}{Str:lf}{THIS_URL}\`
					}
				})
			]
		})
	])
}

main()
`,D=`/// @ ${m}
let title = '地理クイズ'

let qas = [{
	q: 'オーストラリアの首都は？'
	choices: ['シドニー', 'キャンベラ', 'メルボルン']
	a: 'キャンベラ'
	aDescription: '最大の都市はシドニーですが首都はキャンベラです。'
}, {
	q: '国土面積2番目の国は？'
	choices: ['カナダ', 'アメリカ', '中国']
	a: 'カナダ'
	aDescription: '大きい順にロシア、カナダ、アメリカ、中国です。'
}, {
	q: '二重内陸国ではないのは？'
	choices: ['リヒテンシュタイン', 'ウズベキスタン', 'レソト']
	a: 'レソト'
	aDescription: 'レソトは(一重)内陸国です。'
}, {
	q: '閘門がない運河は？'
	choices: ['キール運河', 'スエズ運河', 'パナマ運河']
	a: 'スエズ運河'
	aDescription: 'スエズ運河は高低差がないので閘門はありません。'
}]

let qaEls = [Ui:C:container({
	align: 'center'
	children: [
		Ui:C:text({
			size: 1.5
			bold: true
			text: title
		})
	]
})]

var qn = 0
each (let qa, qas) {
	qn += 1
	qa.id = Util:uuid()
	qaEls.push(Ui:C:container({
		align: 'center'
		bgColor: '#000'
		fgColor: '#fff'
		padding: 16
		rounded: true
		children: [
			Ui:C:text({
				text: \`Q{qn} {qa.q}\`
			})
			Ui:C:select({
				items: qa.choices.map(@(c) {{ text: c, value: c }})
				onChange: @(v) { qa.userAnswer = v }
			})
			Ui:C:container({
				children: []
			}, \`{qa.id}:a\`)
		]
	}, qa.id))
}

@finish() {
	var score = 0

	each (let qa, qas) {
		let correct = qa.userAnswer == qa.a
		if (correct) score += 1
		let el = Ui:get(\`{qa.id}:a\`)
		el.update({
			children: [
				Ui:C:text({
					size: 1.2
					bold: true
					color: if (correct) '#f00' else '#00f'
					text: if (correct) '🎉正解' else '不正解'
				})
				Ui:C:text({
					text: qa.aDescription
				})
			]
		})
	}

	let result = \`{title}の結果は{qas.len}問中{score}問正解でした。\`
	Ui:get('footer').update({
		children: [
			Ui:C:postFormButton({
				text: '結果を共有'
				rounded: true
				primary: true
				form: {
					text: \`{result}{Str:lf}{THIS_URL}\`
				}
			})
		]
	})
}

qaEls.push(Ui:C:container({
	align: 'center'
	children: [
		Ui:C:button({
			text: '答え合わせ'
			primary: true
			rounded: true
			onClick: finish
		})
	]
}, 'footer'))

Ui:render(qaEls)
`,M=`/// @ ${m}
// APIリクエストを行いローカルタイムラインを表示するプリセット

@fetch() {
	Ui:render([
		Ui:C:container({
			align: 'center'
			children: [
				Ui:C:text({ text: "読み込み中..." })
			]
		})
	])

	// タイムライン取得
	let notes = Mk:api("notes/local-timeline", {})

	// それぞれのノートごとにUI要素作成
	let noteEls = []
	each (let note, notes) {
		// 表示名を設定していないアカウントはidを表示
		let userName = if Core:type(note.user.name) == "str" note.user.name else note.user.username
		// リノートもしくはメディア・投票のみで本文が無いノートに代替表示文を設定
		let noteText = if Core:type(note.text) == "str" note.text else "（リノートもしくはメディア・投票のみのノート）"

		let el = Ui:C:container({
			bgColor: "#444"
			fgColor: "#fff"
			padding: 10
			rounded: true
			children: [
				Ui:C:mfm({
					text: userName
					bold: true
				})
				Ui:C:mfm({
					text: noteText
				})
			]
		})
		noteEls.push(el)
	}

	// UIを表示
	Ui:render([
		Ui:C:text({ text: "ローカル タイムライン" })
		Ui:C:button({
			text: "更新"
			onClick: @() {
				fetch()
			}
		})
		Ui:C:container({
			children: noteEls
		})
	])
}

fetch()
`,y=F(),g=E,t=p(null);g.id&&(t.value=([f,U]=ee(()=>K("flash/show",{flashId:g.id})),f=await f,U(),f));const v=p(t.value?.title??"New Play"),h=p(t.value?.summary??""),b=p([]),{model:d,def:V}=L({items:[{label:"สาธารณะ",value:"public"},{label:"ส่วนตัว",value:"private"}],initialValue:t.value?.visibility??"public"}),o=p(t.value?.script??S);function P(n){Q([{text:"Omikuji",action:()=>{o.value=w}},{text:"Shuffle",action:()=>{o.value=T}},{text:"Quiz",action:()=>{o.value=D}},{text:"Timeline viewer",action:()=>{o.value=M}}],n.currentTarget??n.target)}async function R(){if(t.value!=null)x("flash/update",{flashId:t.value.id,title:v.value,summary:h.value,permissions:b.value,script:o.value,visibility:d.value});else{const n=await x("flash/create",{title:v.value,summary:h.value,permissions:b.value,script:o.value,visibility:d.value});y.push("/play/:id/edit",{params:{id:n.id}})}}function A(){t.value==null?j({text:"Please save"}):J(`/play/${t.value.id}`)}async function H(){if(t.value==null)return;const{canceled:n}=await Y({type:"warning",text:(({x})=>("ต้องการลบ “"+x+"” ใช่ไหม?"))({x:t.value.title})});n||(await x("flash/delete",{flashId:t.value.id}),y.push("/play"))}const N=_(()=>[]),$=_(()=>[]);return z(()=>({title:t.value?`${"แก้ไข Play"}: ${t.value.title}`:"สร้าง Play"})),(n,e)=>{const B=te("PageWithHeader");return q(),k(B,{actions:N.value,tabs:$.value},{footer:s(()=>[a("div",{class:"xg9Cy"},[a("div",re,[a("div",oe,[c(C,{primary:"",onClick:R},{default:s(()=>[e[5]||(e[5]=a("i",{class:"ti ti-check"},null,-1)),i(" "+r("บันทึก"),1)]),_:1}),c(C,{onClick:A},{default:s(()=>[e[6]||(e[6]=a("i",{class:"ti ti-eye"},null,-1)),i(" "+r("แสดงผล"),1)]),_:1}),t.value?(q(),k(C,{key:0,danger:"",onClick:H},{default:s(()=>[e[7]||(e[7]=a("i",{class:"ti ti-trash"},null,-1)),i(" "+r("ลบ"),1)]),_:1})):se("",!0)])])],2)]),default:s(()=>[a("div",ae,[a("div",ie,[c(W,{modelValue:v.value,"onUpdate:modelValue":e[0]||(e[0]=u=>v.value=u)},{label:s(()=>[i(r("หัวข้อ"),1)]),_:1},8,["modelValue"]),c(O,{modelValue:I(d),"onUpdate:modelValue":e[1]||(e[1]=u=>le(d)?d.value=u:null),items:I(V)},{label:s(()=>[i(r("การมองเห็น"),1)]),caption:s(()=>[i(r("หากตั้งค่าเป็นส่วนตัว มันจะไม่ปรากฏในโปรไฟล์อีกต่อไป แต่ผู้ที่ทราบ URL ของมันจะยังสามารถเข้าถึงได้"),1)]),_:1},8,["modelValue","items"]),c(Z,{modelValue:h.value,"onUpdate:modelValue":e[2]||(e[2]=u=>h.value=u),mfmAutocomplete:!0,mfmPreview:!0},{label:s(()=>[i(r("คำอธิบาย"),1)]),_:1},8,["modelValue"]),c(C,{primary:"",onClick:P},{default:s(()=>[i(r("เลือกจากการพรีเซ็ต"),1),e[4]||(e[4]=a("i",{class:"ti ti-chevron-down"},null,-1))]),_:1}),c(G,{modelValue:o.value,"onUpdate:modelValue":e[3]||(e[3]=u=>o.value=u),lang:"is"},{label:s(()=>[i(r("สคริปต์"),1)]),_:1},8,["modelValue"])])])]),_:1},8,["actions","tabs"])}}});export{ke as default};
