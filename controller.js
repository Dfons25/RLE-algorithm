function encodeF() {
							
			var toCode = document.getElementById("encode").value;
			var outputLabel = document.getElementById("output-encode");
			var pctLabel = document.getElementById("pct");
			
			finalString = '';
			previousChar = toCode.charAt(0);
			count = 0;
			
			for (var i = 0; i <= toCode.length; i++) {
				if(toCode.charAt(i) == previousChar){
					if (count > 26) {
						finalString += '#' + String.fromCharCode(95 + count) + previousChar;
						count = 0;
					}
					count ++;
				} else {
					finalString += (count > 1) ? '#' + String.fromCharCode(95 + count) + previousChar : (previousChar == '#') ? '##' : previousChar;
					previousChar = toCode.charAt(i);
					count = 1;
				}								
			}
		
			outputLabel.innerHTML = (finalString == '') ? '&nbsp': finalString ;
			
			pct = (toCode.length == 0) ? 0 : 100/toCode.length*outputLabel.textContent.length;
			
			document.getElementById("initial-size").innerHTML = toCode.length;
			document.getElementById("final-size").innerHTML = (finalString == '') ? 0 : outputLabel.textContent.length;
			
			(toCode.length == finalString.length) ? '&nbsp' : (pct > 100) ? (pctLabel.innerHTML = "+" + (pct - 100).toFixed(2).toString() + '% of original size', pctLabel.className = 'asscR') : (pctLabel.innerHTML = pct.toFixed(2) + '% of original size', pctLabel.className = 'asscG');
			}
			
			
		function decodeF() {
							
			var toDecode = document.getElementById("decode").value;
			var outputLabel = document.getElementById("output-decode");
			var matchLabel = document.getElementById("match");
			
			finalString = '';
			stackNumber = 0;
			
			
			for (var i = 0; i < toDecode.length; i++) {
				skipNext = false;
				if (toDecode.charAt(i) == '#'){
					if (toDecode.charAt(i + 1) == '#'){
						finalString += '#';
						i+=1;
					}
					else if (toDecode.charAt(i + 2) == '#'){
						for(j = 0; j < toDecode.charAt(i + 1).charCodeAt() - 95; j++){
							finalString += '#';
						}
						i+=2;
					} else {
						stackNumber = toDecode.charAt(i + 1).charCodeAt() - 95;
						skipNext = true;
					}
				} else {
					if(stackNumber > 0){
						if(!skipNext){
							for(j = 0; j < stackNumber - 1; j++){
								finalString += toDecode.charAt(i + 1);
							}
						}
						stackNumber = 0;
					} else {
						finalString += toDecode.charAt(i);
					}
				}

			}
			
			outputLabel.innerHTML = (finalString == '') ? '&nbsp': finalString;

			(finalString.toString() == document.getElementById("encode").value) ? (matchLabel.innerHTML = 'Perfect match', matchLabel.className = 'asscG') : (matchLabel.innerHTML = 'Something went wrong', matchLabel.className = 'asscR');
			}
		
		function decodeFocus() {
			document.getElementById("output-decode").innerHTML = document.getElementById("match").innerHTML = '&nbsp';
			document.getElementById("match").className = 'assc';
			}
			
		function encodeFocus()  {
			document.getElementById("output-encode").innerHTML = document.getElementById("pct").innerHTML = document.getElementById("match").innerHTML = '&nbsp';
			document.getElementById("match").className = 'assc';
			document.getElementById("initial-size").innerHTML = document.getElementById("final-size").innerHTML = 0;
			}