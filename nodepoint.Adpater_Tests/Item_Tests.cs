﻿using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using nodepoint.Adpater;
using System.Threading.Tasks;

namespace nodepoint.Adpater_Tests
{
    //[TestClass]
    //public class SPItem_Tests
    //{
    //    int testListId = 11;

    //    SPList list;
    //    SPItem item;

    //    [TestInitialize]
    //    public void Init()
    //    {
    //        list = SPContext.Current.Web.Lists[testListId];
    //        item = list.GetItemById(11);
    //    }
        
    //    [TestMethod]
    //    public void ItemIdIsCorrect()
    //    {
    //        Assert.AreEqual(11, item.ID);
    //    }

    //    //TODO: [] name, index, guid

    //    [TestMethod]
    //    public void FieldsIsNotNull()
    //    {
    //        Assert.IsNotNull(item.Fields);
    //    }

    //    // Update() does nothing?
    //    //[TestMethod]
    //    //public void UpdateUpdates()
    //    //{
    //    //    item.Update();
    //    //    Assert.Fail();
    //    //}

    //    // Deletes() deletes // TODO: Doesn't thsi need allowunsafeupdates ans web.Update() ?
    //    //[TestMethod]
    //    //public void DeleteDeletes()
    //    //{
    //    //    var id = item.Id;
    //    //    list.GetItembyId(id);
    //    //    item.Delete();
    //    //    Assert.IsNull(list);
    //    //    Assert.Fail();
    //    //}
    //}
}
