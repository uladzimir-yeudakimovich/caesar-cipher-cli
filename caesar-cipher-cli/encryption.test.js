const encryption = require("./encryption")
// @ponicode
describe("encryption.caesarCode", () => {
    test("0", () => {
        let callFunction = () => {
            encryption.caesarCode("$dummy_name", ["HELlO, WorLD!", "hello, world!", "This is a Text", "Hello, world!"], "install")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param2 = [["foo bar", "Foo bar", "Foo bar", "This is a Text", "Hello, world!", "foo bar", "Foo bar"], ["This is a Text", "foo bar", "foo bar", "foo bar", "Foo bar", "Hello, world!", "Hello, world!"], ["This is a Text", "Foo bar", "Hello, world!", "This is a Text", "Hello, world!", "foo bar", "Foo bar"]]
        let callFunction = () => {
            encryption.caesarCode("dummy_name/", param2, "SHUTDOWN")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param2 = [["foo bar", "Foo bar", "This is a Text", "This is a Text", "Foo bar", "This is a Text", "foo bar"], ["This is a Text", "foo bar", "foo bar", "Hello, world!", "Hello, world!", "This is a Text", "This is a Text"], ["This is a Text", "Hello, world!", "foo bar", "Foo bar", "foo bar", "foo bar", "Hello, world!"]]
        let callFunction = () => {
            encryption.caesarCode("dummy_name/", param2, "encode")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            encryption.caesarCode("DUMMYNAME", ["Foo bar", "HELLO, WORLD!", "Hello, world!", "This is a Text"], "DELETE")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param2 = [["Hello, world!", "foo bar", "Foo bar", "Foo bar", "Hello, world!", "This is a Text", "Foo bar"], ["This is a Text", "This is a Text", "Foo bar", "Hello, world!", "This is a Text", "Hello, world!", "Foo bar"], ["Hello, world!", "Hello, world!", "Hello, world!", "foo bar", "Hello, world!", "Hello, world!", "foo bar"]]
        let callFunction = () => {
            encryption.caesarCode("/dummy_name", param2, "REMOVE")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            encryption.caesarCode(undefined, undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
