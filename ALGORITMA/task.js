/* Soal no. 1------------------------------------------------------------------------------------------------------
Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"
*/

let str = "NEGIE1";

function reverseStr (string) {
    let splitStr = string.split("");
    let strOnlyArr = []
    let numStr = [];
    let combiner = [];

    for (let i = 0 ; i < splitStr.length ; i++) {
        if (/[A-Za-z]/.test(splitStr[i])) {
            strOnlyArr.push(splitStr[i]);
        } else {
            numStr.push(splitStr[i]);
        }
    };
    strOnlyArr.reverse()
    combiner.push(strOnlyArr.join("").toString(), numStr.join("").toString());
    const result = combiner.join("");

    return result.toString();
    }

// console.log(reverseStr(str));


/* Soal no. 2-------------------------------------------------------------------------------------------------------
Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, jika ada kata dengan panjang yang sama silahkan ambil salah satu

Contoh:

const sentence = "Saya sangat senang mengerjakan soal algoritma"

longest(sentence) 
// mengerjakan: 11 character
*/

const sentence = "Saya sangat senang mengerjakan soal algoritma"

function checkLongestWords (str) {
    let strSplit = str.split(" ");
    let result = [];

    for (let i = 0 ;  i < strSplit.length ; i++) {
        if (strSplit[i].length > result.length) {
            result = strSplit[i];
        }
    }

    return(`${result}: ${result.length} character`)
}

// console.log(checkLongestWords(sentence));

/* Soal no. 3-----------------------------------------------------------------------------------------------------------
Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT
Contoh:

INPUT = ['xc', 'dz', 'bbb', 'dz']  
QUERY = ['bbb', 'ac', 'dz']  

OUTPUT = [1, 0, 2] karena kata 'bbb' terdapat 1 pada INPUT, kata 'ac' tidak ada pada INPUT, dan kata 'dz' terdapat 2 pada INPUT
*/

const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];

function checkInputQuery (input, query) {
    let result = [];

    for (let i = 0 ; i < query.length ; i++) {
        let queryCount = 0;
        input.forEach(data => { 
            if (data === query[i]) {
                queryCount += 1;
            }
        });
        result.push(queryCount);
    }
    return(result);
}

// console.log(checkInputQuery(INPUT, QUERY));




/* Soal no. 4-----------------------------------------------------------------------------------------------------------
Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN Contoh:
Contoh:

Matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]

diagonal pertama = 1 + 5 + 9 = 15 
diagonal kedua = 0 + 5 + 7 = 12 

maka hasilnya adalah 15 - 12 = 3
*/

const Matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]];

function getArrayStructure (arr) {
    const arrayColl = arr.length;
    const arrayRow = arr[0].length;
    let leftDiagonal = 0;
    let rightDiagonal = 0;

    for (let i = 0 ; i < arrayRow ; i++) {
        for (let j = 0 ;  j < arrayColl ; j++) {
            leftDiagonal += arr[i][j]
            console.log(arr[i][j]);
            i+=1;
        }
    }

    for (let i = 0 ; i < arrayRow ; i++) {
        for (let j = arrayColl-1 ;  j >= 0 ; j--) {
            rightDiagonal += arr[i][j];
            console.log(arr[i][j]);
            i+=1;
        }
    }
    return (leftDiagonal - rightDiagonal);
}

// console.log(getArrayStructure(Matrix));
