var mongoose = require('mongoose')

var jade = require('jade')
var dateParser = require('date-fns')
var locale = require('date-fns/locale/pt')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/betelife', { useMongoClient: true })

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

var studentSchema = mongoose.Schema({
	nome: String,
	nascimento: Date,
	idade: Number,
	tamanho_camisa: String,
	pai: String,
	mae: String,
	telefone: String,
	endereco: String,
	mora_com: String,
	responsavel: String,
	responsavel_rg: String,
	pai_profissao: String,
	mae_profissao: String,
	pai_religiao: String,
	mae_religiao: String,
	escola: String,
	serie: String,
	repetente: { type: Boolean, default: false },
	ja_aluno: { type: Boolean, default: false },
	problema_saude: { type: Boolean, default: false },
	problema_saude_qual: String,
	medicamento_usa: { type: Boolean, default: false },
	medicamento_qual: String,
	remedio_febre: String,
	recomendacao_familia: String,
	retorna_sozinho: { type: Boolean, default: false },
	quem_busca: String,
	data_cadastro: Date
})

var volunteerSchema = mongoose.Schema({
	nome: String,
	nascimento: Date,
	idade: Number,
	escolaridade: String,
	endereco: String,
	telefone: String,
	whatsapp: String,
	email: String,
	rg: String,
	cpf: String,
	igreja: String,
	pastor: String,
	ministerio: String,
	medicamento_usa: { type: Boolean, default: false },
	medicamento_qual: String,
	medicamento_motivo: String,
	acompanhamento: { type: Boolean, default: false },
	acompanhamento_motivo: String,
	experiencia: { type: Boolean, default: false },
	experiencia_onde: String,
	experiencia_desc: String,
	entendimento: String,
	principios: String,
	submete: { type: Boolean, default: false },
	submete_explica: String,
	nao_faz: String,
	expectativa: String,
	data_cadastro: Date,
	status: { type: Boolean, default: true }
})

var Student = mongoose.model('Student', studentSchema)
var Volunteer = mongoose.model('Volunteer', volunteerSchema)

export function howMany(callback) {
	Student.count().exec((err, studentsCount) => {
		console.log(studentsCount)

		let toReturn = {
			students: studentsCount
		}
		
		Volunteer.count().exec((err, volunteersCount) => {
			console.log(volunteersCount)
			
			toReturn.volunteers = volunteersCount
			callback(toReturn)
		})
	})
}

export function getStudents(callback) {
	Student.find().select('nome telefone mae idade').exec((err, stds) => {
		callback(stds)
	})
}

export function getStudent(id, callback) {
	let query = Student.findOne({ '_id': id })
	query.exec((err, std) => {
		callback(std)
	})
}

export function printStudent(id, callback) {
	Student.findOne({ '_id': id }).exec((err, student) => {
		let birthDate = dateParser.format(student.nascimento, 'DD/MM/YYYY')
		let submitDate = dateParser.format(student.data_cadastro, 'DD/MM/YYYY')
		let today = dateParser.format(Date.now(), 'DD [de] MMMM [de] YYYY', { locale: locale })
		
		let htlm = jade.renderFile(__static + '/printable/student.jade', { aluno: student, nascimento: birthDate, cadastro: submitDate, hoje: today})

		callback(htlm)
	})
}

export function deleteStudent(id, callback) {
	Student.findByIdAndRemove(id).exec((err, done) => {
		callback(done)
	})
}

export function saveStudent(studentToSave, callback) {
	let student = new Student(studentToSave)
	student.save((err, std) => {
		callback('saved into database')
	})
}

export function updateStudent(studentToUpdate, callback) {
	let query = Student.findOneAndUpdate({ '_id': studentToUpdate._id }, studentToUpdate)
	query.exec((err, done) => {
		callback('updated student')
	})
}

export function getVolunteer(id, callback) {
	let query = Volunteer.findOne({ '_id': id })
	
	query.exec((err, std) => {
		callback(std)
	})
}

export function updateStatus(info, callback) {
	let id = info.id
	let status = info.status

	let query = Volunteer.findOneAndUpdate({ '_id': id }, { status: status })
	query.exec((err, done) => {
		callback(done)
	})
}

export function deleteVolunteer(id, callback) {
	Volunteer.findByIdAndRemove(id).exec((err, done) => {
		callback(done)
	})
}

export function getVolunteers(callback) {
	let query = Volunteer.find()
	query.select('nome telefone idade status')

	query.exec((err, vlts) => {
		callback(vlts)
	})
}

export function saveVolunteer(info, callback) {
	let volunteer = new Volunteer(info)
	volunteer.save((err, vlt) => {
		callback('saved volunteer')
	})
}

export function updateVolunteer(info, callback) {
	let query = Volunteer.findOneAndUpdate({ '_id': info._id }, info)
	query.exec((err, done) => {
		callback('updated volunteer')
	})
}