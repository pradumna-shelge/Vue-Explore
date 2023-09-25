

export  function  CustomValidationMsg(msg,key){
let cusMassage = ""
    switch(msg){
        case  "Value is required":
            cusMassage="*"+key+" "+" is required";
            break;

            case "*Value is not a valid email address":
               cusMassage="*Please enter valid email address "; 
            case "The value must be equal to the other value":
                cusMassage="*   Password does not match"
    }

return cusMassage
}