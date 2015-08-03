/**
 * @author Zeh Fernando
 */
export default class PageUtils {

	static getQueryParameter(name:string):string {
		// http://stackoverflow.com/questions/901115/get-query-string-values-in-javascript
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(window.location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

}