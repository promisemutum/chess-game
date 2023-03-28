import { useRef } from 'react';
import './chessboard.css';

const verticalAxis = ["1","2","3","4","5","6","7","8"];
const horizontalAxis = ["a","b","c","d","e","f","g","h"];

interface Piece {
    image: string;
    x: number;
    y: number;
}

const pieces: Piece[] = [];

//pawn black
for(let i=0; i<8; i++){
    pieces.push({image:"./assets/images/pawn_b.png",x:i,y:6});
}
//pawn white
for(let i=0; i<8; i++){
    pieces.push({image:"./assets/images/pawn_w.png",x:i,y:1});
}

//rook
pieces.push({image:"./assets/images/rook_b.png",x:0,y:7});
pieces.push({image:"./assets/images/rook_b.png",x:7,y:7});
pieces.push({image:"./assets/images/rook_w.png",x:0,y:0});
pieces.push({image:"./assets/images/rook_w.png",x:7,y:0});
//knight
pieces.push({image:"./assets/images/knight_b.png",x:1,y:7});
pieces.push({image:"./assets/images/knight_b.png",x:6,y:7});
pieces.push({image:"./assets/images/knight_w.png",x:1,y:0});
pieces.push({image:"./assets/images/knight_w.png",x:6,y:0});
//bishop
pieces.push({image:"./assets/images/bishop_b.png",x:2,y:7});
pieces.push({image:"./assets/images/bishop_b.png",x:5,y:7});
pieces.push({image:"./assets/images/bishop_w.png",x:2,y:0});
pieces.push({image:"./assets/images/bishop_w.png",x:5,y:0});
//queen
pieces.push({image:"./assets/images/queen_b.png",x:3,y:7});
pieces.push({image:"./assets/images/queen_w.png",x:3,y:0});
//king
pieces.push({image:"./assets/images/king_b.png",x:4,y:7});
pieces.push({image:"./assets/images/king_w.png",x:4,y:0});

export default function Chessboard() {

    const chessboardRef = useRef<HTMLDivElement>(null);

    let board=[];

    let activePiece: HTMLElement | null = null;

    function grabPiece(e: React.MouseEvent){
        const element = e.target as HTMLElement;
        if (element.classList.contains("chess-piece")){
            console.log(e);

            const x = e.clientX-50;
            const y = e.clientY-50;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            activePiece = element;
        }
    }

    function movePiece(e: React.MouseEvent){
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard){
            const minX = chessboard.offsetLeft-25;
            const minY = chessboard.offsetTop-25;
            const maxX = chessboard.offsetLeft+chessboard.clientWidth-75;
            const maxY = chessboard.offsetTop+chessboard.clientHeight-75;
            const x = e.clientX-50;
            const y = e.clientY-50;
            activePiece.style.position = "absolute";

            if(x<minX){
                activePiece.style.left=`${minX}px`;
            }
            else if(x>maxX){
                activePiece.style.left=`${maxX}px`;
            }
            else{
                activePiece.style.left=`${x}px`;
            }

            if(y<minY){
                activePiece.style.top=`${minY}px`;
            }
            else if(y>maxY){
                activePiece.style.top=`${maxY}px`;
            }
            else{
                activePiece.style.top=`${y}px`;
            }
        }
    }

    function dropPiece(e: React.MouseEvent){
        if (activePiece){
            activePiece = null;
        }
    }

    for(let j=verticalAxis.length-1; j>=0; j--){
        for(let i=0; i<horizontalAxis.length; i++){
            const number = i + j + 2
            let image = undefined;

            pieces.forEach((p) => {
                if (p.x === i && p.y===j) {
                    image = p.image;
                }
            });

            if(number%2===0){
                board.push(
                    <div className='black-tile' key={`${j},${i}`}>
                        {image && <div className='chess-piece' style={{ backgroundImage: `url(${image})` }}></div>}
                    </div>);
            } else {
                board.push(
                    <div className='white-tile' key={`${j},${i}`}>
                        {image && <div className='chess-piece' style={{ backgroundImage: `url(${image})` }}></div>}
                    </div>
                );
            }
        }
    }

    return<div 
        onMouseMove={e => movePiece(e)} 
        onMouseDown={e => grabPiece(e)} 
        onMouseUp={e => dropPiece(e)}
        id="chessboard"
        ref={chessboardRef}>
            {board}
        </div>
}