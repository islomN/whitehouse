

export default {
    methods: {
        numeralFormat(val){

            if(!val || isNaN(val)){
                val = 0;
            }
            val = (val* 1).toFixed(2) * 1;
            let delimiterIndex = val ? val.toString().indexOf('.'): -1;

            if(delimiterIndex!== -1 &&delimiterIndex < val.toString().length-3){
                if(isNaN(val)){
                    val = 0;
                }
                try{
                    val = val ? val.substring(0, delimiterIndex+3): 0

                }catch (e) {
                    val = 0;
                }
            }

            let val_str = !isNaN(val) ? new Intl.NumberFormat('ru-RU').format(val): 0;

            let length = val ? val.length: 0;
            if(delimiterIndex !== -1 && delimiterIndex === val.length -1){
                val_str += ",";
            }

            if(delimiterIndex !== -1 && delimiterIndex === val.length - 2 && val.toString().indexOf('0') === val.length - 1){
                val_str += ",0";
            }

            return val_str;
        },
        numeralFormatToNumber(val){
            return val ? val.replace(/\s/g, "").replace(",", "."): 0;
        }
    },
    filters:{
        numeralFormatFilter(val){
            return  !isNaN(val) ? new Intl.NumberFormat('ru-RU').format(val): 0;
        }
    }
}
