class Bookmarks_API {
    static API_URL() { return "http://localhost:5000/api/bookmarks" };
    static async Get(id = null) {
        return new Promise(resolve => {
            $.ajax({
                url: this.API_URL() + (id != null ? "/" + id : ""),
                success: datas => { resolve(datas); },
                error: (xhr) => { console.log(xhr); resolve(null); }
            });
        });
    }
    static async Save(data, create = true) {
        return new Promise(resolve => {
            $.ajax({
                url: this.API_URL(),
                type: create ? this.API_URL() : this.API_URL() + "/" + data.id,
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: (/*data*/) => { resolve(true); },
                error: (/*xhr*/) => { resolve(false /*xhr.status*/); }
            });
        });
    }
    static async Delete(id) {
        return new Promise(resolve => {
            $.ajax({
                url: this.API_URL() + "/" + id,
                type: "DELETE",
                success: () => { resolve(true); },
                error: (/*xhr*/) => { resolve(false /*xhr.status*/); }
            });
        });
    }
}