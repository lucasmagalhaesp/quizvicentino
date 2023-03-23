export default {
    data(){
        return {
            ignorarValidacaoDatas: ['', null, "0000-00-00", "0000-00-00 00:00:00", "2000-01-01", "2000-01-01 00:00:00"]
        }
    },
    methods:{
        formatDateBR(data){ return this.ignorarValidacaoDatas.includes(data) ?  "" : new Date(data+"T00:00:00.0").toLocaleDateString("pt-BR")},
        formatMoneyBR: valor => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        formataDataTimeBR(data) { return this.ignorarValidacaoDatas.includes(data) ?  "" : new Date(data.replace("-", ",")).toLocaleDateString("pt-BR", {hour:  "2-digit", minute: "2-digit", second: "2-digit"}) },
        dateFormatMobile(date){
            let dateTime = this.formataDataTimeBR(date).split(":");
            dateTime.pop();
            return dateTime.join(":").replace(",", "");
        },
        formatDateTimeBR(date) {
            let data = new Date(date);
                let dia  = data.getDate().toString();
                let diaF = (dia.length == 1) ? '0' + dia : dia;
                let mes  = (data.getMonth()+1).toString(); //+1 pois no getMonth() Janeiro começa com zero.
                let mesF = (mes.length == 1) ? '0' + mes : mes;
                let anoF = data.getFullYear();
                let hora = data.getHours().toString();
                let horaF = hora.length == 1 ? '0' + hora : hora;
                let minuto = data.getMinutes().toString();
                let minutoF = minuto.length == 1 ? '0' + minuto : minuto;
                let segundos = data.getSeconds().toString();
                let segundosF = segundos.length == 1 ? '0' + segundos : segundos; 
            return diaF + "/" + mesF + "/" + anoF + " " + horaF + ":" + minutoF;
        },
        convertSecondsinMinutes(seconds){
            let minutes = Math.floor(seconds / 60);
            seconds = seconds - (minutes * 60);
            return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
        }
    }
}