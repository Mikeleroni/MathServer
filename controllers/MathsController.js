import MathModel from '../models/maths.js';
import Repository from '../models/repository.js';
import Controller from './Controller.js';
import path from 'path';
import fs from 'fs';

export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext, new Repository(new MathModel()));
    }
    help() {
        let helpPagePath = path.join(process.cwd(), wwwroot, 'API-Help-Pages/API-Help-Pages.html');
        this.HttpContext.response.HTML(fs.readFileSync(helpPagePath));

    }
    get() {
        let param = this.HttpContext.path.params;
        if (this.HttpContext.path.queryString == '?')
            this.help();
        else
            this.doOperation(param);
    }
    doOperation(param) {
        let op = param.op;
        let x = param.x;
        let y = param.y;
        let n = param.n;
        let nbParam = Object.keys(param).length
        if(op != undefined && this.HttpContext.path.queryString.includes('x') && this.HttpContext.path.queryString.includes('y') && nbParam == 3)
        {
            if(op == " " )
            {
                param.op = "+";
                param.value = parseFloat(x) + parseFloat(y);
            }
            else if(op == "-")
            {
                param.value = parseFloat(x) - parseFloat(y);
            }
            else if(op == "*")
            {
                param.value = parseFloat(x) * parseFloat(y);
            }
            else if(op == "/")
            {
                if(param.y == 0 && param.x == 0)
                {
                    param.value = NaN.toString();
                }else if(param.y == 0)
                {
                    param.value = Infinity.toString();
                }
                else{
                    param.value = parseFloat(x) / parseFloat(y);
                }
                
            }
            else if(op == "%")
            {
                if(param.y == 0)
                {
                    param.value = NaN.toString();
                }
                else{
                    param.value = parseFloat(x) % parseFloat(y);
                }
                
            }
            return this.HttpContext.response.JSON(param);
        }
        if(op != undefined && this.HttpContext.path.queryString.includes('n') && nbParam == 2 && param.n % 1 == 0){
            if(op == "!")
            {
                if(parseInt(param.n) <= 0)
                {
                    param.error = "'n' devrait etre un integer > 0";
                }else if(parseInt(n) > 170)
                {
                    param.value = Infinity.toString();
                }
                else{
                    param.value = this.factorial(parseInt(n));
                }
            }
            else if(op == "p"){
                if(parseInt(param.n) <= 0 || this.isFloat(parseFloat(n))){
                    param.error = "'n' devrait etre un integer > 0";
                }else{
                    param.value = this.isPrime(parseInt(n));
                }
            }
            else if(op == "np")
            {
                param.value = this.findPrime(parseInt(n));
            }
            return this.HttpContext.response.JSON(param);
        }
        else
        {
            param.error = "Manque des parametres";
        }
        return this.HttpContext.response.JSON(param);
    }
    factorial(n) {
        if (n === 0 || n === 1) {
            return 1;
        }
        return n * this.factorial(n - 1);
    }
    
    isPrime(value) {
        for (var i = 2; i < value; i++) {
            if (value % i === 0) {
                return false;
            }
        }
        return value > 1;
    }
    isFloat(n){
        return typeof n === 'number' && n % 1 !== 0;
    }
    /*ContientMajuscuel(param){
        if(param == /[A-Z]/)
        {
            return true;
        }
        else{
            return false;
        }
    }*/
    
    findPrime(n) {
        let primeNumer = 0;
        for (let i = 0; i < n; i++) {
            primeNumer++;
            while (!this.isPrime(primeNumer)) {
                primeNumer++;
            }
        }
        return primeNumer;
    }
}




